import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import { WhatsappOtp, WhatsappOtpDocument } from './schemas/whatsapp-otp.schema';
import type { IWhatsappOtpProvider } from './interfaces/whatsapp-otp-provider.interface';
import { WHATSAPP_OTP_PROVIDER } from './interfaces/whatsapp-otp-provider.interface';

@Injectable()
export class WhatsappOtpService {
  private readonly logger = new Logger(WhatsappOtpService.name);

  private readonly otpExpirySeconds: number;
  private readonly resendCooldownSeconds: number;
  private readonly maxAttempts: number;
  private readonly maxRequestsPerHour: number;
  private readonly verificationExpirySeconds: number;

  constructor(
    @InjectModel(WhatsappOtp.name)
    private readonly otpModel: Model<WhatsappOtpDocument>,
    @Inject(WHATSAPP_OTP_PROVIDER)
    private readonly whatsappProvider: IWhatsappOtpProvider,
    private readonly configService: ConfigService,
  ) {
    this.otpExpirySeconds = parseInt(
      this.configService.get<string>('WHATSAPP_OTP_EXPIRY_SECONDS') || '300',
      10,
    );
    this.resendCooldownSeconds = parseInt(
      this.configService.get<string>('WHATSAPP_OTP_RESEND_COOLDOWN_SECONDS') ||
        '60',
      10,
    );
    this.maxAttempts = parseInt(
      this.configService.get<string>('WHATSAPP_OTP_MAX_ATTEMPTS') || '5',
      10,
    );
    this.maxRequestsPerHour = parseInt(
      this.configService.get<string>('WHATSAPP_OTP_MAX_REQUESTS_PER_HOUR') ||
        '5',
      10,
    );
    this.verificationExpirySeconds = parseInt(
      this.configService.get<string>('WHATSAPP_VERIFICATION_EXPIRY_SECONDS') ||
        '600',
      10,
    );
  }

  /**
   * Request a new OTP for the given phone number.
   * - Enforces rate limiting (max requests per hour)
   * - Enforces resend cooldown
   * - Invalidates any previous active OTPs
   * - Hashes OTP before storage
   */
  async requestOtp(phoneNumber: string) {
    // ── Rate limit: max requests per hour ──
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentCount = await this.otpModel.countDocuments({
      phoneNumber,
      createdAt: { $gte: oneHourAgo },
    });

    if (recentCount >= this.maxRequestsPerHour) {
      throw new BadRequestException(
        'Too many OTP requests. Please try again after some time.',
      );
    }

    // ── Resend cooldown: check the most recent active OTP ──
    const lastOtp = await this.otpModel
      .findOne({ phoneNumber, invalidated: false })
      .sort({ createdAt: -1 })
      .exec();

    if (lastOtp && lastOtp.resendAvailableAt > new Date()) {
      const waitSeconds = Math.ceil(
        (lastOtp.resendAvailableAt.getTime() - Date.now()) / 1000,
      );
      throw new BadRequestException(
        `Please wait ${waitSeconds} seconds before requesting a new OTP.`,
      );
    }

    // ── Invalidate previous OTPs for this phone ──
    await this.otpModel.updateMany(
      { phoneNumber, invalidated: false },
      { $set: { invalidated: true } },
    );

    // ── Generate 6-digit OTP ──
    const otp = this.generateSecureOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.otpExpirySeconds * 1000);
    const resendAvailableAt = new Date(
      now.getTime() + this.resendCooldownSeconds * 1000,
    );

    // ── Store hashed OTP ──
    await this.otpModel.create({
      phoneNumber,
      otpHash,
      expiresAt,
      resendAvailableAt,
      attemptCount: 0,
      maxAttempts: this.maxAttempts,
      verified: false,
      consumed: false,
      invalidated: false,
    });

    // ── Send OTP via WhatsApp ──
    try {
      await this.whatsappProvider.sendOtp(phoneNumber, otp);
    } catch (error) {
      this.logger.error(`Failed to send OTP to ${phoneNumber}`, error);
      throw new BadRequestException(
        'Failed to send verification code. Please try again.',
      );
    }

    // ── Return masked phone and metadata ──
    const maskedPhone = this.maskPhoneNumber(phoneNumber);

    return {
      maskedPhone,
      expiresInSeconds: this.otpExpirySeconds,
      resendAvailableInSeconds: this.resendCooldownSeconds,
    };
  }

  /**
   * Verify a 6-digit OTP code.
   * Returns a verificationId that must be submitted with the lead form.
   */
  async verifyOtp(phoneNumber: string, otp: string) {
    const otpRecord = await this.otpModel
      .findOne({
        phoneNumber,
        invalidated: false,
        expiresAt: { $gt: new Date() },
      })
      .sort({ createdAt: -1 })
      .exec();

    if (!otpRecord) {
      throw new NotFoundException(
        'No active OTP found. Please request a new verification code.',
      );
    }

    // ── Check max attempts ──
    if (otpRecord.attemptCount >= otpRecord.maxAttempts) {
      await this.otpModel.updateOne(
        { _id: otpRecord._id },
        { $set: { invalidated: true } },
      );
      throw new BadRequestException(
        'Maximum verification attempts exceeded. Please request a new OTP.',
      );
    }

    // ── Increment attempt count ──
    otpRecord.attemptCount += 1;
    await this.otpModel.updateOne(
      { _id: otpRecord._id },
      { $set: { attemptCount: otpRecord.attemptCount } },
    );

    // ── Compare hash ──
    const isMatch = await bcrypt.compare(otp, otpRecord.otpHash);

    if (!isMatch) {
      const remaining = otpRecord.maxAttempts - otpRecord.attemptCount;
      throw new UnauthorizedException(
        `Invalid OTP. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`,
      );
    }

    // ── Generate secure verification ID ──
    const verificationId = crypto.randomBytes(32).toString('hex');
    const verificationExpiresAt = new Date(
      Date.now() + this.verificationExpirySeconds * 1000,
    );

    await this.otpModel.updateOne(
      { _id: otpRecord._id },
      {
        $set: {
          verified: true,
          verifiedAt: new Date(),
          verificationId,
          verificationExpiresAt,
        },
      },
    );

    return {
      verified: true,
      verificationId,
    };
  }

  /**
   * Validate that a verificationId is legitimate, bound to the phone,
   * not expired, and not consumed.
   * Called by LeadsService before creating a lead.
   */
  async validateVerification(
    phoneNumber: string,
    verificationId: string,
  ): Promise<boolean> {
    const record = await this.otpModel
      .findOne({
        phoneNumber,
        verificationId,
        verified: true,
        consumed: false,
        verificationExpiresAt: { $gt: new Date() },
      })
      .exec();

    return !!record;
  }

  /**
   * Mark a verification as consumed so it cannot be reused.
   * Called after a lead is successfully created.
   */
  async consumeVerification(verificationId: string): Promise<void> {
    await this.otpModel.updateOne(
      { verificationId },
      { $set: { consumed: true } },
    );
  }

  /**
   * Generate a cryptographically secure 6-digit OTP.
   */
  private generateSecureOtp(): string {
    const buffer = crypto.randomBytes(4);
    const num = buffer.readUInt32BE(0) % 900000;
    return String(num + 100000);
  }

  /**
   * Mask a phone number for display (e.g. +91****3210)
   */
  private maskPhoneNumber(phone: string): string {
    if (phone.length <= 6) return phone;
    const prefix = phone.slice(0, 3);
    const suffix = phone.slice(-4);
    const masked = '*'.repeat(phone.length - 7);
    return `${prefix}${masked}${suffix}`;
  }
}
