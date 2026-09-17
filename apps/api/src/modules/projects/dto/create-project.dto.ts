import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProjectAmenityDto {
  @IsOptional()
  @IsString()
  icon?: string;

  @IsNotEmpty()
  @IsString()
  label: string;
}

export class ProjectHighlightDto {
  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNotEmpty()
  @IsString()
  label: string;
}

export class ProjectLocationAdvantageDto {
  @IsNotEmpty()
  @IsString()
  distance: string;

  @IsNotEmpty()
  @IsString()
  landmark: string;
}

export class ProjectRevenueJurisdictionDto {
  @IsOptional()
  @IsString()
  village?: string;

  @IsOptional()
  @IsString()
  mandal?: string;

  @IsOptional()
  @IsString()
  division?: string;

  @IsOptional()
  @IsString()
  district?: string;
}

export class ProjectReportDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  type?: string;
}

export class ProjectGalleryImageDto {
  @IsNotEmpty()
  @IsString()
  src: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  badge?: string;
}

export class ProjectCoordinatesDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

export class CreateProjectDto {
  @IsOptional()
  @IsString()
  slug?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum([
    'Open Plots',
    'Apartments',
    'Villas',
    'Holiday Homes',
    'Farm Plots',
  ])
  category: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  fullDescription?: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectCoordinatesDto)
  coordinates?: ProjectCoordinatesDto;

  @IsOptional()
  @IsString()
  badge?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  priceDisplay?: string;

  @IsOptional()
  @IsNumber()
  priceVal?: number;

  @IsOptional()
  @IsNumber()
  pricePerSqft?: number;

  @IsOptional()
  @IsNumber()
  minInvestment?: number;

  @IsOptional()
  @IsString()
  expectedRoi?: string;

  @IsOptional()
  @IsNumber()
  roiVal?: number;

  @IsOptional()
  @IsString()
  expectedAppreciation?: string;

  @IsOptional()
  @IsString()
  rentalYield?: string;

  @IsOptional()
  @IsString()
  horizon?: string;

  @IsOptional()
  @IsString()
  areaSqft?: string;

  @IsOptional()
  @IsString()
  totalAcres?: string;

  @IsOptional()
  @IsNumber()
  totalPlots?: number;

  // Media
  @IsOptional()
  @IsString()
  heroImage?: string;

  @IsNotEmpty()
  @IsString()
  featuredImage: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectGalleryImageDto)
  galleryImages?: ProjectGalleryImageDto[];

  @IsOptional()
  @IsString()
  videoTourUrl?: string;

  @IsOptional()
  @IsString()
  brochureUrl?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectReportDto)
  reports?: ProjectReportDto[];

  // Developer Details
  @IsOptional()
  @IsString()
  developerName?: string;

  @IsOptional()
  @IsString()
  developerDesc?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectAmenityDto)
  amenities?: ProjectAmenityDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectHighlightDto)
  highlights?: ProjectHighlightDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  legalChecks?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectLocationAdvantageDto)
  locationAdvantages?: ProjectLocationAdvantageDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ProjectRevenueJurisdictionDto)
  revenueJurisdiction?: ProjectRevenueJurisdictionDto;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  isFlagship?: boolean;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;
}
