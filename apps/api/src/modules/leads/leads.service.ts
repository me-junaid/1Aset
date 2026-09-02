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
  private readonly neoDoveCrmWebhookUrl: string;

  constructor(
    @InjectModel(Lead.name) private readonly leadModel: Model<LeadDocument>,
    private readonly whatsappOtpService: WhatsappOtpService,
    private readonly configService: ConfigService,
  ) {
    this.googleSheetsWebhookUrl =
      this.configService.get<string>('GOOGLE_SHEETS_WEBHOOK_URL') || '';
    this.neoDoveCrmWebhookUrl =
      this.configService.get<string>('NEODOVE_CRM_WEBHOOK_URL') ||
      'https://2dfb0b37-c8db-4877-919d-68f029567963.neodove.com/integration/custom/8770b6d6-35ec-4634-808f-a2462b2b4ab3/leads';
  }

  /**
   * Create a verified lead.
   * 1. Validate the WhatsApp verification ID
   * 2. Create the lead in MongoDB
   * 3. Consume the verification (prevent reuse)
   * 4. Forward to Google Sheets webhook (backwards compatibility)
   * 5. Forward to NeoDove CRM webhook
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

    // ── Step 5: Forward to NeoDove CRM (non-blocking) ──
    this.forwardToNeoDove(dto).catch((err) => {
      this.logger.warn('NeoDove CRM webhook forwarding failed', err?.message);
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

  /**
   * Forward lead data to NeoDove CRM webhook.
   * Fire-and-forget — failures here don't block lead creation.
   */
  private async forwardToNeoDove(dto: CreateLeadDto): Promise<void> {
    if (!this.neoDoveCrmWebhookUrl) return;

    try {
      const digits = (dto.phoneNumber || '').replace(/\D/g, '');
      const mobileNumber =
        digits.length >= 10 ? Number(digits.slice(-10)) : Number(digits) || 0;

      const payload = {
        name: dto.name || '',
        mobile: mobileNumber,
        email: dto.email || '',
        detail1: dto.interestedIn || 'Vedha Bhoomi',
        detail2: `Budget: ${dto.budgetRange || '25L'} | Visit: ${dto.siteVisit || 'Not decided'}`,
        detail3: dto.preferredLocation || 'North Bengaluru',
        detail4: `Source: ${dto.source || '1ASET Website'}`,
      };

      const response = await fetch(this.neoDoveCrmWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        this.logger.warn(
          `NeoDove CRM returned status ${response.status}: ${response.statusText}`,
        );
      } else {
        this.logger.log(`Lead forwarded to NeoDove CRM: name=${dto.name}`);
      }
    } catch (error: any) {
      this.logger.warn('NeoDove CRM forwarding error', error?.message || error);
    }
  }
}
