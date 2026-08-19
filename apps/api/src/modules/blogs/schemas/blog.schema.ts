import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ _id: false })
export class Author {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  avatar: string;
}

const AuthorSchema = SchemaFactory.createForClass(Author);

@Schema({ timestamps: true })
export class Blog {
  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, index: true })
  category: string;

  @Prop({ required: true })
  excerpt: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  coverImage: string;

  @Prop({ type: AuthorSchema, required: true })
  author: Author;

  @Prop({ required: true })
  readTime: string;

  @Prop({ required: true, default: () => new Date().toISOString() })
  publishedAt: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 0 })
  views: number;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

// Indexes for high performance searches
BlogSchema.index({ title: 'text', excerpt: 'text', content: 'text' });
BlogSchema.index({ category: 1, publishedAt: -1 });
