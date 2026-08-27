import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ForbiddenException,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WhatsappOtpService } from './whatsapp-otp.service';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('api/v1/whatsapp-otp')
export class WhatsappOtpController {
  constructor(private readonly whatsappOtpService: WhatsappOtpService) {}

  /**
   * POST /api/v1/whatsapp-otp/request
   * Send a 6-digit OTP to the user's WhatsApp number.
   */
  @Post('request')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async requestOtp(@Body() dto: RequestOtpDto) {
    const result = await this.whatsappOtpService.requestOtp(dto.phoneNumber);
    return {
      status: 200,
      message: 'Verification code sent to your WhatsApp',
      data: result,
    };
  }

  /**
   * POST /api/v1/whatsapp-otp/verify
   * Verify the 6-digit OTP entered by the user.
   */
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    const result = await this.whatsappOtpService.verifyOtp(
      dto.phoneNumber,
      dto.otp,
    );
    return {
      status: 200,
      message: 'Phone number verified successfully',
      data: result,
    };
  }

  /**
   * GET /api/v1/whatsapp-otp/webhook
   * Meta WhatsApp Webhook Verification Endpoint.
   */
  @Get('webhook')
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    const verifyToken =
      process.env.META_WHATSAPP_VERIFY_TOKEN || '1aset_verify_token';
    if (mode === 'subscribe' && token === verifyToken) {
      return challenge;
    }
    throw new ForbiddenException('Invalid verify token');
  }

  /**
   * POST /api/v1/whatsapp-otp/webhook
   * Meta WhatsApp Webhook Event Notification Endpoint.
   */
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  handleWebhook(@Body() body: any) {
    return { status: 'EVENT_RECEIVED' };
  }
}
