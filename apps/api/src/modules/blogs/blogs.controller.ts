import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { QueryBlogDto } from './dto/query-blog.dto';

@Controller('api/v1/blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: QueryBlogDto) {
    const blogs = await this.blogsService.findAll(query);
    return {
      status: 200,
      message: 'Blogs retrieved successfully',
      data: blogs,
    };
  }

  @Get('featured')
  async findFeatured() {
    const blogs = await this.blogsService.findFeatured();
    return {
      status: 200,
      message: 'Featured blogs retrieved successfully',
      data: blogs,
    };
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const blog = await this.blogsService.findBySlug(slug);
    return {
      status: 200,
      message: 'Blog retrieved successfully',
      data: blog,
    };
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createBlogDto: CreateBlogDto) {
    const blog = await this.blogsService.create(createBlogDto);
    return {
      status: 201,
      message: 'Blog created successfully',
      data: blog,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: Partial<CreateBlogDto>,
  ) {
    const blog = await this.blogsService.update(id, updateBlogDto);
    return {
      status: 200,
      message: 'Blog updated successfully',
      data: blog,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const blog = await this.blogsService.remove(id);
    return {
      status: 200,
      message: 'Blog deleted successfully',
      data: blog,
    };
  }
}
