import {
  Controller,
  Post,
  Body,
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
}
