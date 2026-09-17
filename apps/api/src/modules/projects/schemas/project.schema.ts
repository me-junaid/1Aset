import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ _id: false })
export class ProjectAmenity {
  @Prop()
  icon?: string;

  @Prop({ required: true })
  label: string;
}

@Schema({ _id: false })
export class ProjectHighlight {
  @Prop({ required: true })
  value: string;

  @Prop({ required: true })
  label: string;
}

@Schema({ _id: false })
export class ProjectLocationAdvantage {
  @Prop({ required: true })
  distance: string;

  @Prop({ required: true })
  landmark: string;
}

@Schema({ _id: false })
export class ProjectRevenueJurisdiction {
  @Prop()
  village?: string;

  @Prop()
  mandal?: string;

  @Prop()
  division?: string;

  @Prop()
  district?: string;
}

@Schema({ _id: false })
export class ProjectReport {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  type?: string;
}

@Schema({ _id: false })
export class ProjectGalleryImage {
  @Prop({ required: true })
  src: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  badge?: string;
}

@Schema({ _id: false })
export class ProjectCoordinates {
  @Prop({ type: Number })
  lat: number;

  @Prop({ type: Number })
  lng: number;
}

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({
    required: true,
    enum: [
      'Open Plots',
      'Apartments',
      'Villas',
      'Holiday Homes',
      'Farm Plots',
    ],
    index: true,
  })
  category: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop()
  fullDescription?: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  city?: string;

  @Prop({ type: ProjectCoordinates })
  coordinates?: ProjectCoordinates;

  @Prop()
  badge?: string;

  @Prop({
    required: true,
    default: 'Clear Title',
    index: true,
  })
  status: string;

  // Pricing & Metrics
  @Prop({ default: '' })
  priceDisplay: string;

  @Prop({ type: Number, default: 0 })
  priceVal: number;

  @Prop({ type: Number })
  pricePerSqft?: number;

  @Prop({ type: Number })
  minInvestment?: number;

  @Prop()
  expectedRoi?: string;

  @Prop({ type: Number })
  roiVal?: number;

  @Prop()
  expectedAppreciation?: string;

  @Prop()
  rentalYield?: string;

  @Prop()
  horizon?: string;

  @Prop()
  areaSqft?: string;

  @Prop()
  totalAcres?: string;

  @Prop({ type: Number })
  totalPlots?: number;

  // Media
  @Prop()
  heroImage?: string;

  @Prop({ required: true })
  featuredImage: string;

  @Prop({ type: [Object], default: [] })
  galleryImages: ProjectGalleryImage[];

  @Prop()
  videoTourUrl?: string;

  @Prop()
  brochureUrl?: string;

  @Prop({ type: [Object], default: [] })
  reports?: ProjectReport[];

  // Developer Details
  @Prop()
  developerName?: string;

  @Prop()
  developerDesc?: string;

  // Features & Legal
  @Prop({ type: [Object], default: [] })
  amenities: ProjectAmenity[];

  @Prop({ type: [Object], default: [] })
  highlights: ProjectHighlight[];

  @Prop({ type: [String], default: [] })
  legalChecks: string[];

  @Prop({ type: [Object], default: [] })
  locationAdvantages?: ProjectLocationAdvantage[];

  @Prop({ type: ProjectRevenueJurisdiction })
  revenueJurisdiction?: ProjectRevenueJurisdiction;

  // Flags & Meta
  @Prop({ default: false, index: true })
  featured: boolean;

  @Prop({ default: false })
  isFlagship: boolean;

  @Prop({ default: true, index: true })
  published: boolean;

  @Prop()
  metaTitle?: string;

  @Prop()
  metaDescription?: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

// Compound and text indexes for search & filtering
ProjectSchema.index({ title: 'text', shortDescription: 'text', location: 'text' });
ProjectSchema.index({ category: 1, published: 1, createdAt: -1 });
ProjectSchema.index({ featured: 1, published: 1 });
