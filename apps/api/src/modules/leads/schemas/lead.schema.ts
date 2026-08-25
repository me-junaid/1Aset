import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeadDocument = Lead & Document;

@Schema({ _id: false, timestamps: false })
export class LeadNote {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, default: () => new Date() })
  addedAt: Date;

  @Prop()
  addedBy: string;
}

const LeadNoteSchema = SchemaFactory.createForClass(LeadNote);

@Schema({ timestamps: true })
export class Lead {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, index: true })
  phone: string;

  @Prop()
  email: string;

  @Prop()
  language: string;

  @Prop()
  budgetRange: string;

  @Prop()
  siteVisit: string;

  @Prop()
  interestedIn: string;

  @Prop()
  preferredLocation: string;

  @Prop()
  message: string;

  @Prop({
    required: true,
    enum: [
      '1ASET Contact Form',
      'Project Page',
      'Landing Page',
      'WhatsApp',
      'Referral',
      'Other',
    ],
    default: '1ASET Contact Form',
    index: true,
  })
  source: string;

  @Prop({
    required: true,
    enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'FOLLOW_UP', 'CONVERTED', 'LOST'],
    default: 'NEW',
    index: true,
  })
  status: string;

  @Prop({ default: false })
  otpVerified: boolean;

  @Prop()
  otpVerifiedAt: Date;

  @Prop({ type: [LeadNoteSchema], default: [] })
  notes: LeadNote[];
}

export const LeadSchema = SchemaFactory.createForClass(Lead);

// Compound index for admin queries (status filter + date sort)
LeadSchema.index({ status: 1, createdAt: -1 });
LeadSchema.index({ source: 1, createdAt: -1 });
