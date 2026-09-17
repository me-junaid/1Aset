import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { QueryProjectDto } from './dto/query-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/v1/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() query: QueryProjectDto) {
    const result = await this.projectsService.findAll(query);
    return {
      status: 200,
      message: 'Projects retrieved successfully',
      data: result,
    };
  }

  @Get('featured')
  async findFeatured() {
    const projects = await this.projectsService.findFeatured();
    return {
      status: 200,
      message: 'Featured projects retrieved successfully',
      data: projects,
    };
  }

  @Post('seed')
  async seed() {
    await this.projectsService.seedInitialProjects();
    return {
      status: 200,
      message: 'Initial platform projects seeded successfully',
    };
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const project = await this.projectsService.findBySlug(slug);
    return {
      status: 200,
      message: 'Project retrieved successfully',
      data: project,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async create(@Body() createProjectDto: CreateProjectDto) {
    const project = await this.projectsService.create(createProjectDto);
    return {
      status: 201,
      message: 'Project created successfully',
      data: project,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: Partial<CreateProjectDto>,
  ) {
    const project = await this.projectsService.update(id, updateProjectDto);
    return {
      status: 200,
      message: 'Project updated successfully',
      data: project,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    const result = await this.projectsService.remove(id);
    return {
      status: 200,
      message: 'Project deleted successfully',
      data: result,
    };
  }
}
