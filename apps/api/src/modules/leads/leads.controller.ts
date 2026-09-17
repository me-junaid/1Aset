import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/v1/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  /**
   * POST /api/v1/leads
   * Public: Create a new verified lead (requires whatsappVerificationId).
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async createLead(@Body() dto: CreateLeadDto) {
    const result = await this.leadsService.createLead(dto);
    return {
      status: 201,
      message: 'Enquiry submitted successfully',
      data: result,
    };
  }

  /**
   * GET /api/v1/leads
   * Admin/Sales: List leads with search, filtering, and pagination.
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SALES')
  async findAll(
    @Query('status') status?: string,
    @Query('source') source?: string,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const result = await this.leadsService.findAll({
      status,
      source,
      search,
      page,
      limit,
    });
    return {
      status: 200,
      message: 'Leads retrieved successfully',
      data: result,
    };
  }

  /**
   * GET /api/v1/leads/stats
   * Admin/Sales: Lead funnel statistics.
   */
  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SALES')
  async getStats() {
    const stats = await this.leadsService.getStats();
    return {
      status: 200,
      message: 'Lead statistics retrieved successfully',
      data: stats,
    };
  }

  /**
   * PATCH /api/v1/leads/:id/status
   * Admin/Sales: Update lead status.
   */
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SALES')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const lead = await this.leadsService.updateStatus(id, status);
    return {
      status: 200,
      message: 'Lead status updated successfully',
      data: lead,
    };
  }

  /**
   * POST /api/v1/leads/:id/notes
   * Admin/Sales: Add internal note to lead.
   */
  @Post(':id/notes')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SALES')
  async addNote(
    @Param('id') id: string,
    @Body('text') text: string,
    @Request() req: any,
  ) {
    const addedBy = req.user?.email || 'Admin';
    const lead = await this.leadsService.addNote(id, text, addedBy);
    return {
      status: 200,
      message: 'Note added successfully',
      data: lead,
    };
  }
}
