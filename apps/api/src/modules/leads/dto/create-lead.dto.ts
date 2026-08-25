import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsIn,
  Matches,
} from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+[1-9]\d{6,14}$/, {
    message: 'Phone number must be in E.164 format (e.g. +919876543210)',
  })
  phoneNumber: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  budgetRange?: string;

  @IsString()
  @IsOptional()
  siteVisit?: string;

  @IsString()
  @IsOptional()
  interestedIn?: string;

  @IsString()
  @IsOptional()
  preferredLocation?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  @IsIn([
    '1ASET Contact Form',
    'Project Page',
    'Landing Page',
    'WhatsApp',
    'Referral',
    'Other',
  ])
  source?: string;

  /** Required: the verification ID returned from the OTP verify endpoint */
  @IsString()
  @IsNotEmpty({ message: 'WhatsApp verification is required to submit an enquiry' })
  whatsappVerificationId: string;
}
