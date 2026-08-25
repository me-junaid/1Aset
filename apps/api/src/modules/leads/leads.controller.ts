import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('api/v1/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  /**
   * POST /api/v1/leads
   * Create a new verified lead (requires whatsappVerificationId).
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
}
