import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { WhatsappOtpController } from './whatsapp-otp.controller';
import { WhatsappOtpService } from './whatsapp-otp.service';
import { WhatsappOtp, WhatsappOtpSchema } from './schemas/whatsapp-otp.schema';
import { MetaWhatsappProvider } from './providers/meta-whatsapp.provider';
import { WHATSAPP_OTP_PROVIDER } from './interfaces/whatsapp-otp-provider.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WhatsappOtp.name, schema: WhatsappOtpSchema },
    ]),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
  ],
  controllers: [WhatsappOtpController],
  providers: [
    WhatsappOtpService,
    {
      provide: WHATSAPP_OTP_PROVIDER,
      useClass: MetaWhatsappProvider,
    },
  ],
  exports: [WhatsappOtpService],
})
export class WhatsappOtpModule {}
