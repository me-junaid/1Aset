import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

export enum BlogStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  SCHEDULED = 'SCHEDULED',
  ARCHIVED = 'ARCHIVED',
}

@Schema({ _id: false })
export class Author {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ default: '' })
  bio?: string;
}

const AuthorSchema = SchemaFactory.createForClass(Author);

@Schema({ _id: false })
export class BlogSeo {
  @Prop({ default: '' })
  metaTitle?: string;

  @Prop({ default: '' })
  metaDescription?: string;

  @Prop({ type: [String], default: [] })
  keywords?: string[];

  @Prop({ default: '' })
  ogImage?: string;

  @Prop({ default: '' })
  canonicalUrl?: string;
}

const BlogSeoSchema = SchemaFactory.createForClass(BlogSeo);

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({
    required: true,
    enum: [
      'All',
      'Market Trends',
      'Investment Strategy',
      'Legal & RERA',
      'Micro-Markets',
      'Property Guides',
    ],
    index: true,
  })
  category: string;

  @Prop({ required: true })
  excerpt: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  coverImage: string;

  @Prop({ type: AuthorSchema, required: true })
  author: Author;

  @Prop({ required: true, default: '5 min read' })
  readTime: string;

  @Prop({
    required: true,
    enum: Object.values(BlogStatus),
    default: BlogStatus.DRAFT,
    index: true,
  })
  status: BlogStatus;

  @Prop({ required: true, default: () => new Date().toISOString(), index: true })
  publishedAt: string;

  @Prop()
  scheduledAt?: string;

  @Prop({ default: false, index: true })
  featured: boolean;

  @Prop({ type: [String], default: [], index: true })
  tags: string[];

  @Prop({ default: 0 })
  views: number;

  @Prop({ type: BlogSeoSchema, default: () => ({}) })
  seo?: BlogSeo;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

// Indexes for high-performance searches and querying
BlogSchema.index({ title: 'text', excerpt: 'text', content: 'text', tags: 'text' });
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ category: 1, status: 1, publishedAt: -1 });
BlogSchema.index({ featured: 1, status: 1, publishedAt: -1 });
