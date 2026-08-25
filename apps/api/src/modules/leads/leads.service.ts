import {
  Injectable,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Lead, LeadDocument } from './schemas/lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { WhatsappOtpService } from '../whatsapp-otp/whatsapp-otp.service';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);
  private readonly googleSheetsWebhookUrl: string;

  constructor(
    @InjectModel(Lead.name) private readonly leadModel: Model<LeadDocument>,
    private readonly whatsappOtpService: WhatsappOtpService,
    private readonly configService: ConfigService,
  ) {
    this.googleSheetsWebhookUrl =
      this.configService.get<string>('GOOGLE_SHEETS_WEBHOOK_URL') || '';
  }

  /**
   * Create a verified lead.
   * 1. Validate the WhatsApp verification ID
   * 2. Create the lead in MongoDB
   * 3. Consume the verification (prevent reuse)
   * 4. Forward to Google Sheets webhook (backwards compatibility)
   */
  async createLead(dto: CreateLeadDto) {
    // ── Step 1: Validate verification ──
    const isValid = await this.whatsappOtpService.validateVerification(
      dto.phoneNumber,
      dto.whatsappVerificationId,
    );

    if (!isValid) {
      throw new BadRequestException(
        'Invalid or expired WhatsApp verification. Please verify your phone number again.',
      );
    }

    // ── Step 2: Create lead ──
    const lead = await this.leadModel.create({
      name: dto.name,
      phone: dto.phoneNumber,
      email: dto.email || '',
      language: dto.language || 'English',
      budgetRange: dto.budgetRange || '25L',
      siteVisit: dto.siteVisit || 'Not decided',
      interestedIn: dto.interestedIn || '',
      preferredLocation: dto.preferredLocation || '',
      message: dto.message || '',
      source: dto.source || '1ASET Contact Form',
      status: 'NEW',
      otpVerified: true,
      otpVerifiedAt: new Date(),
    });

    this.logger.log(
      `Lead created: id=${lead._id}, phone=${dto.phoneNumber.slice(0, -4)}****`,
    );

    // ── Step 3: Consume verification ──
    await this.whatsappOtpService.consumeVerification(
      dto.whatsappVerificationId,
    );

    // ── Step 4: Forward to Google Sheets (non-blocking) ──
    this.forwardToGoogleSheets(dto).catch((err) => {
      this.logger.warn('Google Sheets webhook forwarding failed', err?.message);
    });

    return {
      leadId: lead._id.toString(),
      name: lead.name,
      phone: lead.phone,
      otpVerified: lead.otpVerified,
    };
  }

  /**
   * Forward lead data to the existing Google Sheets webhook.
   * Fire-and-forget — failures here don't block lead creation.
   */
  private async forwardToGoogleSheets(dto: CreateLeadDto): Promise<void> {
    if (!this.googleSheetsWebhookUrl) return;

    try {
      const params = new URLSearchParams();
      params.append('gid', '0');
      params.append('Full Name', dto.name || '');
      params.append('Phone Number', dto.phoneNumber || '');
      params.append('Language', dto.language || 'English');
      params.append('Budget', dto.budgetRange || '25L');
      params.append('Site Visit', dto.siteVisit || 'Not decided');
      params.append('Email Address', dto.email || '');
      params.append('Interested In', dto.interestedIn || '');
      params.append('Preferred Location', dto.preferredLocation || '');
      params.append('Message', dto.message || '');
      params.append('Source', dto.source || '1ASET Contact Form');
      params.append('Timestamp', new Date().toISOString());

      const url = `${this.googleSheetsWebhookUrl}?${params.toString()}`;
      await fetch(url, { method: 'GET' });

      this.logger.log('Lead forwarded to Google Sheets');
    } catch (error) {
      this.logger.warn('Google Sheets forwarding error', error);
    }
  }
}
