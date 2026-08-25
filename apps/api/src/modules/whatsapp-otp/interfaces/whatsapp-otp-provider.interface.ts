/**
 * Interface for WhatsApp OTP delivery providers.
 * Abstracted so the Meta Cloud API provider can be swapped for
 * another vendor (Twilio, Gupshup, etc.) without touching business logic.
 */
export interface IWhatsappOtpProvider {
  /**
   * Send a 6-digit OTP to the given phone number via WhatsApp.
   * @param phoneNumber - E.164 formatted phone number (e.g. +919876543210)
   * @param otp - 6-digit OTP code
   * @throws Error if the WhatsApp API call fails
   */
  sendOtp(phoneNumber: string, otp: string): Promise<void>;
}

export const WHATSAPP_OTP_PROVIDER = 'WHATSAPP_OTP_PROVIDER';
