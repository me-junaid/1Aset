import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { QueryBlogDto } from './dto/query-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
  ) {}

  async findAll(query: QueryBlogDto): Promise<Blog[]> {
    const filter: any = {};

    if (query.category && query.category !== 'All') {
      filter.category = query.category;
    }

    if (query.featured !== undefined) {
      filter.featured = query.featured;
    }

    if (query.tag) {
      filter.tags = query.tag;
    }

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { excerpt: { $regex: query.search, $options: 'i' } },
        { tags: { $regex: query.search, $options: 'i' } },
      ];
    }

    return this.blogModel.find(filter).sort({ publishedAt: -1 }).exec();
  }

  async findFeatured(): Promise<Blog[]> {
    return this.blogModel.find({ featured: true }).sort({ publishedAt: -1 }).exec();
  }

  async findBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogModel
      .findOneAndUpdate({ slug }, { $inc: { views: 1 } }, { new: true })
      .exec();

    if (!blog) {
      throw new NotFoundException(`Blog post with slug '${slug}' not found`);
    }

    return blog;
  }

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const newBlog = new this.blogModel(createBlogDto);
    return newBlog.save();
  }

  async update(id: string, updateBlogDto: Partial<CreateBlogDto>): Promise<Blog> {
    const updated = await this.blogModel
      .findByIdAndUpdate(id, updateBlogDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Blog post with ID '${id}' not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<Blog> {
    const deleted = await this.blogModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Blog post with ID '${id}' not found`);
    }
    return deleted;
  }
}
