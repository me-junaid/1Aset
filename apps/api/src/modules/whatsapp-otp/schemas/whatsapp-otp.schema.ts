import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WhatsappOtpDocument = WhatsappOtp & Document;

@Schema({ timestamps: true })
export class WhatsappOtp {
  @Prop({ required: true, index: true })
  phoneNumber: string;

  @Prop({ required: true })
  otpHash: string;

  @Prop({ required: true, index: true })
  expiresAt: Date;

  @Prop({ required: true })
  resendAvailableAt: Date;

  @Prop({ default: 0 })
  attemptCount: number;

  @Prop({ default: 5 })
  maxAttempts: number;

  @Prop({ default: false })
  verified: boolean;

  @Prop()
  verifiedAt: Date;

  /** Secure random ID returned to frontend after verification — used as proof during lead submission */
  @Prop({ unique: true, sparse: true, index: true })
  verificationId: string;

  @Prop()
  verificationExpiresAt: Date;

  @Prop({ default: false })
  consumed: boolean;

  @Prop({ default: false })
  invalidated: boolean;
}

export const WhatsappOtpSchema = SchemaFactory.createForClass(WhatsappOtp);

// TTL index: automatically purge expired OTP documents after 24 hours
WhatsappOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 86400 });

// Compound index for active OTP lookups
WhatsappOtpSchema.index(
  { phoneNumber: 1, invalidated: 1, expiresAt: 1 },
  { name: 'active_otp_lookup' },
);
