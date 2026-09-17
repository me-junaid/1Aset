import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/create-blog.dto';
import { QueryBlogDto } from './dto/query-blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { BlogStatus } from './schemas/blog.schema';

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

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findForAdmin(@Query() query: QueryBlogDto) {
    query.admin = true;
    const blogs = await this.blogsService.findAll(query);
    return {
      status: 200,
      message: 'Admin blogs retrieved successfully',
      data: blogs,
    };
  }

  @Post('seed')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async seed() {
    await this.blogsService.seedInitialBlogs();
    return {
      status: 200,
      message: 'Initial platform blogs seeded successfully',
    };
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findById(@Param('id') id: string) {
    const blog = await this.blogsService.findById(id);
    return {
      status: 200,
      message: 'Blog retrieved successfully',
      data: blog,
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(@Body() createBlogDto: CreateBlogDto) {
    const blog = await this.blogsService.create(createBlogDto);
    return {
      status: 201,
      message: 'Blog created successfully',
      data: blog,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async updatePut(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.update(id, updateBlogDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    const blog = await this.blogsService.update(id, updateBlogDto);
    return {
      status: 200,
      message: 'Blog updated successfully',
      data: blog,
    };
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: BlogStatus,
  ) {
    const blog = await this.blogsService.updateStatus(id, status);
    return {
      status: 200,
      message: `Blog status updated to ${status}`,
      data: blog,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    const blog = await this.blogsService.remove(id);
    return {
      status: 200,
      message: 'Blog deleted successfully',
      data: blog,
    };
  }
}
