import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IWhatsappOtpProvider } from '../interfaces/whatsapp-otp-provider.interface';

/**
 * Meta WhatsApp Business Cloud API provider.
 *
 * Uses the AUTHENTICATION template type to send OTP codes.
 * Docs: https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages
 *
 * Required env vars:
 *   META_WHATSAPP_API_VERSION     (e.g. v21.0)
 *   META_WHATSAPP_PHONE_NUMBER_ID (your WABA phone number ID)
 *   META_WHATSAPP_ACCESS_TOKEN    (permanent/system user token)
 *   META_WHATSAPP_OTP_TEMPLATE_NAME (approved AUTHENTICATION template)
 *   META_WHATSAPP_TEMPLATE_LANGUAGE (e.g. en_US)
 */
@Injectable()
export class MetaWhatsappProvider implements IWhatsappOtpProvider {
  private readonly logger = new Logger(MetaWhatsappProvider.name);

  private readonly apiVersion: string;
  private readonly phoneNumberId: string;
  private readonly accessToken: string;
  private readonly templateName: string;
  private readonly templateLanguage: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiVersion =
      this.configService.get<string>('META_WHATSAPP_API_VERSION') || 'v21.0';
    this.phoneNumberId =
      this.configService.get<string>('META_WHATSAPP_PHONE_NUMBER_ID') || '';
    this.accessToken =
      this.configService.get<string>('META_WHATSAPP_ACCESS_TOKEN') || '';
    this.templateName =
      this.configService.get<string>('META_WHATSAPP_OTP_TEMPLATE_NAME') || '';
    this.templateLanguage =
      this.configService.get<string>('META_WHATSAPP_TEMPLATE_LANGUAGE') ||
      'en_US';
  }

  async sendOtp(phoneNumber: string, otp: string): Promise<void> {
    const url = `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`;

    // Strip the leading '+' for the Meta API (expects country code + number without '+')
    const recipientPhone = phoneNumber.replace(/^\+/, '');

    const components = this.templateName.includes('jaspers')
      ? [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: '1ASET Investor' },
              { type: 'text', text: otp },
              { type: 'text', text: 'Valid for 5 mins' },
            ],
          },
        ]
      : [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: otp,
              },
            ],
          },
          {
            type: 'button',
            sub_type: 'url',
            index: '0',
            parameters: [
              {
                type: 'text',
                text: otp,
              },
            ],
          },
        ];

    const payload = {
      messaging_product: 'whatsapp',
      to: recipientPhone,
      type: 'template',
      template: {
        name: this.templateName,
        language: {
          code: this.templateLanguage,
        },
        components,
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, payload, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      this.logger.log(
        `OTP sent to ${phoneNumber.slice(0, -4)}****: messageId=${response.data?.messages?.[0]?.id}`,
      );
    } catch (error: any) {
      const errBody = error?.response?.data || error.message;
      this.logger.error(
        `Failed to send OTP to ${phoneNumber.slice(0, -4)}****`,
        JSON.stringify(errBody),
      );
      throw new Error(
        `WhatsApp API error: ${JSON.stringify(errBody)}`,
      );
    }
  }
}
