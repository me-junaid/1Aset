import {
  Injectable,
  NotFoundException,
  ConflictException,
  OnApplicationBootstrap,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { QueryProjectDto } from './dto/query-project.dto';

export const INITIAL_PROJECTS = [
  {
    slug: 'vedha-bhoomi',
    title: 'Vedha Bhoomi — Luxury Farmland Plots',
    category: 'Farm Plots',
    shortDescription:
      '40-acre gated farmland community near Lepakshi, North Bengaluru. 63 luxury farm plots with drip irrigation, fruit orchards, and world-class clubhouse retreat.',
    fullDescription:
      'Vedha Bhoomi is a premier gated farmland community by Vedha Sree Parivar LLP, nestled in the serene landscapes near Lepakshi — just 90 km from Kempegowda International Airport, North Bengaluru.\n\nSpread across 40 acres (with Phase 1 across 18 acres) and divided into 63 luxury farm plots, each plot comes with up to 400 plants and fruit-bearing trees, comprehensive drip irrigation, and access to a world-class clubhouse. With clear legal title deeds, Vedha Bhoomi offers a rare combination of weekend retreat living and strong long-term land appreciation along the Bengaluru–Vijayawada Expressway growth corridor.',
    badge: 'FLAGSHIP PROJECT',
    status: 'Clear Title',
    location: 'Near Lepakshi, North Bengaluru',
    city: 'Bengaluru',
    revenueJurisdiction: {
      village: 'Chilamathur',
      mandal: 'Chilamathur',
      division: 'Penukonda',
      district: 'Sri Sathya Sai',
    },
    priceDisplay: '₹22 Lakhs',
    priceVal: 2200000,
    pricePerSqft: 250,
    minInvestment: 2200000,
    expectedRoi: '18% p.a.',
    roiVal: 18,
    expectedAppreciation: '18% p.a.',
    rentalYield: '6.5%',
    horizon: '3-5 Yrs',
    areaSqft: '10,600 sqft',
    totalAcres: '40 Acres',
    totalPlots: 63,
    heroImage: '/vedhabhoomi/vedhabhoomi1.jpg',
    featuredImage: '/vedhabhoomi/vedhabhoomi1.jpg',
    galleryImages: [
      { src: '/vedhabhoomi/vedhabhoomi2.jpeg', title: 'Internal Asphalt Roads & Tree Lines' },
      { src: '/vedhabhoomi/vedhabhoomi3.jpeg', title: 'Plot Boundary Demarcation' },
      { src: '/vedhabhoomi/vedhabhoomi4.jpeg', title: 'Panoramic Farmland Vista' },
    ],
    videoTourUrl: '/vedhabhoomi/vedhabhoomi7.mp4',
    reports: [
      {
        title: 'Soil & Water Test Report',
        url: '/vedhabhoomi/soil-and-water-test-report.pdf',
        type: 'PDF',
      },
    ],
    developerName: 'Vedha Sree Parivar LLP',
    developerDesc:
      'A trusted real estate developer specializing in premium gated communities and farmland assets across South India.',
    amenities: [
      { label: 'Drip Irrigation System' },
      { label: '24/7 CCTV Security & Gated Entry' },
      { label: 'Internal Asphalt Roads' },
      { label: 'Borewell & Water Supply' },
      { label: 'Clubhouse Retreat' },
    ],
    highlights: [
      { value: '40 Acres', label: 'Total Area' },
      { value: '63', label: 'Total Units / Plots' },
      { value: '18% p.a.', label: 'Expected ROI' },
      { value: '3-5 Yrs', label: 'Investment Horizon' },
    ],
    legalChecks: [
      '100% Clear Title & Ownership',
      'Clear Patta & Legal Title Deed',
      'Agricultural Farmland',
      'Water Test Reports Available',
      'Soil Test Reports Available',
      'Registered Sale Deed',
    ],
    featured: true,
    isFlagship: true,
    published: true,
  },
  {
    slug: 'marina-crown',
    title: 'Devanahalli Aerotropolis Layout',
    category: 'Open Plots',
    shortDescription:
      'BIAPPA & RERA-approved plotted development minutes from Kempegowda International Airport and 12,000-acre ITIR SEZ.',
    fullDescription:
      'Devanahalli Aerotropolis Layout represents the premier land investment opportunity in North Bengaluru fastest-growing growth corridor. Located minutes from Kempegowda International Airport and the 12,000-acre ITIR SEZ, this layout features wide asphalt roads, underground cabling, and landscaped avenues.\n\nIdeal for investors seeking high annual land appreciation driven by major infrastructure projects including the Namma Metro Blue Line extension and Satellite Town Ring Road (STRR).',
    badge: 'EXCLUSIVE PLOT',
    status: 'BIAPPA Approved',
    location: 'Devanahalli, Bengaluru',
    city: 'Bengaluru',
    priceDisplay: '₹1.25 Cr',
    priceVal: 12500000,
    pricePerSqft: 5200,
    minInvestment: 12500000,
    expectedRoi: '14.5% p.a.',
    roiVal: 14.5,
    expectedAppreciation: '14.5% p.a.',
    rentalYield: '8.5%',
    horizon: '3-5 Yrs',
    areaSqft: '2,400 sqft',
    totalAcres: '25 Acres',
    totalPlots: 120,
    heroImage: '/property-1.jpg',
    featuredImage: '/property-1.jpg',
    galleryImages: [
      { src: '/gallery-interior.jpg', title: 'Layout Landscaping' },
      { src: '/property-1.jpg', title: 'Avenue Roads' },
      { src: '/gallery-lounge.jpg', title: 'Clubhouse Amenities' },
    ],
    developerName: 'Prestige Group',
    developerDesc:
      'With over 30 years of development excellence in Bengaluru, Prestige Group is renowned for landmark plotted communities, luxury towers, and high-yield asset delivery.',
    amenities: [
      { label: 'Underground Cabling & Drainage' },
      { label: 'Wide Asphalt Roads' },
      { label: '24/7 Security' },
      { label: 'Clubhouse & Sports Courts' },
    ],
    highlights: [
      { value: '25 Acres', label: 'Total Area' },
      { value: '120', label: 'Total Units / Plots' },
      { value: '14.5% p.a.', label: 'Expected ROI' },
      { value: '3-5 Yrs', label: 'Investment Horizon' },
    ],
    legalChecks: ['BIAPPA Approved', 'RERA Registered', 'Bank Loan Approved'],
    featured: true,
    isFlagship: false,
    published: true,
  },
  {
    slug: 'mayfair-exchange',
    title: 'Sarjapur Tech Corridor',
    category: 'Open Plots',
    shortDescription:
      'Strategically positioned between Outer Ring Road, Electronic City, and Whitefield tech hubs.',
    fullDescription:
      'Sarjapur Tech Corridor is a premier residential & commercial plotted development strategically positioned between Outer Ring Road, Electronic City, and Whitefield tech hubs. Featuring BDA-approved layout specifications, overhead solar lighting, and 24/7 security, it delivers sustained capital growth and high tenant demand.',
    badge: 'HIGH GROWTH',
    status: 'RERA Registered',
    location: 'Sarjapur Road, Bengaluru',
    city: 'Bengaluru',
    priceDisplay: '₹85 Lakhs',
    priceVal: 8500000,
    pricePerSqft: 5666,
    minInvestment: 8500000,
    expectedRoi: '12.8% p.a.',
    roiVal: 12.8,
    expectedAppreciation: '12.8% p.a.',
    rentalYield: '7.2%',
    horizon: '4-6 Yrs',
    areaSqft: '1,500 sqft',
    totalAcres: '15 Acres',
    totalPlots: 85,
    heroImage: '/property-2.jpg',
    featuredImage: '/property-2.jpg',
    galleryImages: [
      { src: '/gallery-lounge.jpg', title: 'Park & Recreation' },
      { src: '/property-2.jpg', title: 'Entrance Arch' },
      { src: '/gallery-interior.jpg', title: 'Community Hall' },
    ],
    developerName: 'Sobha Developers',
    developerDesc:
      'A trusted legacy of precision engineering, backward integration, and top-tier residential layouts across South India.',
    amenities: [
      { label: 'Solar Street Lighting' },
      { label: 'Rainwater Harvesting' },
      { label: 'Children Play Area' },
    ],
    highlights: [
      { value: '15 Acres', label: 'Total Area' },
      { value: '85', label: 'Total Units / Plots' },
      { value: '12.8% p.a.', label: 'Expected ROI' },
      { value: '4-6 Yrs', label: 'Investment Horizon' },
    ],
    legalChecks: ['BDA Approved', 'RERA Registered', 'Clear Title'],
    featured: true,
    isFlagship: false,
    published: true,
  },
  {
    slug: 'palm-estate',
    title: 'The Imperial Palm Villas',
    category: 'Villas',
    shortDescription:
      'Ultra-exclusive gated villa estate in Yelahanka, North Bengaluru with private plunge pools.',
    fullDescription:
      'An ultra-exclusive gated villa estate offering private plunge pools, lush clubhouse amenities, and bespoke architectural finishes tailored for discerning investors seeking long-term capital preservation in North Bengaluru serene micro-market.',
    badge: 'LUXURY VILLA',
    status: 'Ready to Move',
    location: 'Yelahanka, Bengaluru',
    city: 'Bengaluru',
    priceDisplay: '₹4.5 Cr',
    priceVal: 45000000,
    minInvestment: 45000000,
    expectedRoi: '10.2% p.a.',
    roiVal: 10.2,
    expectedAppreciation: '10.2% p.a.',
    rentalYield: '6.5%',
    horizon: '5-8 Yrs',
    areaSqft: '4,800 sqft',
    totalAcres: '12 Acres',
    totalPlots: 32,
    heroImage: '/property-3.jpg',
    featuredImage: '/property-3.jpg',
    galleryImages: [
      { src: '/property-3.jpg', title: 'Villa Exterior' },
      { src: '/gallery-interior.jpg', title: 'Living Spaces' },
      { src: '/gallery-lounge.jpg', title: 'Clubhouse Lounge' },
    ],
    developerName: 'Brigade Group',
    developerDesc:
      'Award-winning real estate developer behind iconic residential and commercial projects across Bengaluru.',
    amenities: [
      { label: 'Private Plunge Pools' },
      { label: 'Tennis & Badminton Courts' },
      { label: '24/7 Concierge' },
    ],
    highlights: [
      { value: '12 Acres', label: 'Total Area' },
      { value: '32', label: 'Total Units / Plots' },
      { value: '10.2% p.a.', label: 'Expected ROI' },
      { value: '5-8 Yrs', label: 'Investment Horizon' },
    ],
    legalChecks: ['A-Khata Title', 'OC Received', 'Bank Approved'],
    featured: true,
    isFlagship: false,
    published: true,
  },
  {
    slug: 'whitefield-heights',
    title: 'Whitefield IT Heights',
    category: 'Apartments',
    shortDescription:
      'Modern luxury residences located in the heart of Whitefield IT corridor.',
    fullDescription:
      'Modern luxury residences located in the heart of Whitefield IT corridor, adjacent to major tech parks, Purple Line Metro stations, and international schools.',
    badge: 'HIGH YIELD',
    status: 'Under Construction',
    location: 'Whitefield, Bengaluru',
    city: 'Bengaluru',
    priceDisplay: '₹1.8 Cr',
    priceVal: 18000000,
    minInvestment: 18000000,
    expectedRoi: '9.5% p.a.',
    roiVal: 9.5,
    expectedAppreciation: '9.5% p.a.',
    rentalYield: '5.8%',
    horizon: '3-5 Yrs',
    areaSqft: '2,100 sqft',
    totalAcres: '8 Acres',
    totalPlots: 180,
    heroImage: '/property-1.jpg',
    featuredImage: '/property-1.jpg',
    developerName: 'Godrej Properties',
    developerDesc:
      'Pioneering sustainable and design-led real estate developments across India.',
    amenities: [
      { label: 'Infinity Swimming Pool' },
      { label: 'Fitness Center' },
      { label: 'Sky Lounge' },
    ],
    highlights: [
      { value: '8 Acres', label: 'Total Area' },
      { value: '180', label: 'Total Units / Plots' },
      { value: '9.5% p.a.', label: 'Expected ROI' },
      { value: '3-5 Yrs', label: 'Investment Horizon' },
    ],
    legalChecks: ['RERA Approved', 'Clear Title', 'Pre-approved Home Loans'],
    featured: false,
    isFlagship: false,
    published: true,
  },
  {
    slug: 'greenwood-estates',
    title: 'Greenwood Managed Farm Plots',
    category: 'Farm Plots',
    shortDescription:
      'Scenic managed farmland plots equipped with drip irrigation and fruit orchards along Kanakapura Road.',
    fullDescription:
      'Scenic managed farmland plots equipped with drip irrigation, fruit orchards, and resort amenities along Kanakapura Road, offering natural retreat living alongside strong land appreciation.',
    badge: 'ECO INVESTMENT',
    status: 'Clear Title',
    location: 'Kanakapura Road, Bengaluru',
    city: 'Bengaluru',
    priceDisplay: '₹65 Lakhs',
    priceVal: 6500000,
    minInvestment: 6500000,
    expectedRoi: '13.8% p.a.',
    roiVal: 13.8,
    expectedAppreciation: '13.8% p.a.',
    rentalYield: '4.5%',
    horizon: '4-7 Yrs',
    areaSqft: '6,000 sqft',
    totalAcres: '30 Acres',
    totalPlots: 45,
    heroImage: '/property-2.jpg',
    featuredImage: '/property-2.jpg',
    developerName: '1ASET Managed Land',
    developerDesc:
      'Specialized in high-yield agricultural to non-agricultural land asset curation and turnkey layout management.',
    amenities: [
      { label: 'Organic Farming Management' },
      { label: 'Drip Irrigation' },
      { label: 'Eco Clubhouse' },
    ],
    highlights: [
      { value: '30 Acres', label: 'Total Area' },
      { value: '45', label: 'Total Units / Plots' },
      { value: '13.8% p.a.', label: 'Expected ROI' },
      { value: '4-7 Yrs', label: 'Investment Horizon' },
    ],
    legalChecks: ['Agricultural Title', 'Clear Patta', 'Survey Demarcation'],
    featured: false,
    isFlagship: false,
    published: true,
  },
  {
    slug: 'north-bengaluru-gate',
    title: 'North Bengaluru Gateway Layout',
    category: 'Open Plots',
    shortDescription:
      'Prime plotted land in Devanahalli with direct access to Satellite Town Ring Road (STRR).',
    fullDescription:
      'Strategically situated in Devanahalli with instant connectivity to the upcoming Satellite Town Ring Road and Airport Express line. High-potential capital appreciation corridor.',
    badge: 'PRIME LAND',
    status: 'BIAPPA Approved',
    location: 'Devanahalli, Bengaluru',
    city: 'Bengaluru',
    priceDisplay: '₹2.4 Cr',
    priceVal: 24000000,
    minInvestment: 24000000,
    expectedRoi: '15.2% p.a.',
    roiVal: 15.2,
    expectedAppreciation: '15.2% p.a.',
    rentalYield: '6.0%',
    horizon: '3-5 Yrs',
    areaSqft: '3,200 sqft',
    totalAcres: '18 Acres',
    totalPlots: 75,
    heroImage: '/property-3.jpg',
    featuredImage: '/property-3.jpg',
    developerName: 'Prestige Group',
    developerDesc: 'Landmark plotted developer across North Bengaluru corridor.',
    amenities: [
      { label: 'Underground Infrastructure' },
      { label: 'Landscaped Central Park' },
      { label: '24/7 Security' },
    ],
    highlights: [
      { value: '18 Acres', label: 'Total Area' },
      { value: '75', label: 'Total Units / Plots' },
      { value: '15.2% p.a.', label: 'Expected ROI' },
      { value: '3-5 Yrs', label: 'Investment Horizon' },
    ],
    legalChecks: ['BIAPPA Approved', 'Clear Title', 'RERA Registered'],
    featured: true,
    isFlagship: false,
    published: true,
  },
];

@Injectable()
export class ProjectsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedInitialProjects();
  }

  async seedInitialProjects() {
    try {
      for (const projectData of INITIAL_PROJECTS) {
        const existing = await this.projectModel.findOne({ slug: projectData.slug }).exec();
        if (!existing) {
          this.logger.log(`Seeding initial project: ${projectData.title} (${projectData.slug})`);
          await this.projectModel.create(projectData);
        }
      }
    } catch (err: any) {
      this.logger.error(`Error during initial projects seeding: ${err.message}`, err.stack);
    }
  }

  private slugify(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async findAll(query: QueryProjectDto) {
    const filter: Record<string, any> = {};

    if (query.category && query.category !== 'All') {
      filter.category = query.category;
    }

    if (query.status) {
      filter.status = query.status;
    }

    if (typeof query.featured === 'boolean') {
      filter.featured = query.featured;
    }

    if (query.search) {
      filter.$text = { $search: query.search };
    }

    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      this.projectModel
        .find(filter)
        .sort({ isFlagship: -1, featured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.projectModel.countDocuments(filter).exec(),
    ]);

    return {
      projects,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findFeatured() {
    return this.projectModel
      .find({ featured: true, published: true })
      .sort({ isFlagship: -1, createdAt: -1 })
      .limit(6)
      .exec();
  }

  async findByIdOrSlug(idOrSlug: string) {
    let project: ProjectDocument | null = null;

    if (isValidObjectId(idOrSlug)) {
      project = await this.projectModel.findById(idOrSlug).exec();
    }

    if (!project) {
      project = await this.projectModel.findOne({ slug: idOrSlug }).exec();
    }

    if (!project) {
      throw new NotFoundException(`Project "${idOrSlug}" not found`);
    }

    return project;
  }

  async findBySlug(slug: string) {
    return this.findByIdOrSlug(slug);
  }

  async findById(id: string) {
    return this.findByIdOrSlug(id);
  }

  async create(dto: CreateProjectDto) {
    const slug = dto.slug || this.slugify(dto.title);

    const existing = await this.projectModel.findOne({ slug }).exec();
    if (existing) {
      throw new ConflictException(
        `Project with slug "${slug}" already exists. Please choose a different title or slug.`,
      );
    }

    const createdProject = new this.projectModel({
      ...dto,
      slug,
    });

    return createdProject.save();
  }

  async update(idOrSlug: string, dto: Partial<CreateProjectDto>) {
    const project = await this.findByIdOrSlug(idOrSlug);
    const id = project._id;

    if (dto.slug) {
      const existing = await this.projectModel
        .findOne({ slug: dto.slug, _id: { $ne: id } })
        .exec();
      if (existing) {
        throw new ConflictException(`Slug "${dto.slug}" is already in use.`);
      }
    }

    const updated = await this.projectModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return updated;
  }

  async remove(idOrSlug: string) {
    const project = await this.findByIdOrSlug(idOrSlug);
    await this.projectModel.findByIdAndDelete(project._id).exec();
    return { deleted: true, id: project._id };
  }
}
