import {
  Injectable,
  NotFoundException,
  ConflictException,
  OnApplicationBootstrap,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Blog, BlogDocument, BlogStatus } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { QueryBlogDto } from './dto/query-blog.dto';

export const INITIAL_BLOGS = [
  {
    slug: 'devanahalli-north-bengaluru-investment-hotspot',
    title: 'North Bengaluru Growth Corridor: Why Devanahalli is the Next Investment Hotspot',
    category: 'Micro-Markets',
    excerpt:
      'With Kempegowda International Airport expansions, upcoming Tech Hubs, and massive infrastructure developments, Devanahalli is witnessing unprecedented land value appreciation. Here is what smart investors need to know.',
    content: `
      <h2>The Shift Towards North Bengaluru</h2>
      <p>Bengaluru’s real estate landscape has evolved rapidly over the last decade. While South and East Bengaluru dominated previous growth cycles through IT parks in Electronic City and Whitefield, North Bengaluru—specifically the Devanahalli corridor—has emerged as the premier destination for capital appreciation and long-term land investment.</p>
      
      <h3>Key Drivers of Devanahalli's Growth</h3>
      <ul>
        <li><strong>Kempegowda International Airport Expansion:</strong> The operationalization of Terminal 2 and planned cargo terminals position North Bengaluru as an international logistics and commercial epicenter.</li>
        <li><strong>Aerotropolis & IT Investment Regions (ITIR):</strong> Over 12,000 acres of land dedicated to tech parks, aerospace SEZs, and hardware technology clusters.</li>
        <li><strong>Namma Metro Line 3 Extension:</strong> Blue Line connectivity will directly bridge Central Silk Board, Outer Ring Road, and KIAL, cutting transit times dramatically.</li>
        <li><strong>Satellite Town Ring Road (STRR):</strong> A 280-km expressway connecting Devanahalli to Hoskote, Dobbaspet, and Electronics City, bypassing city congestion.</li>
      </ul>

      <blockquote>
        "Land values in Devanahalli have recorded an average compound annual growth rate (CAGR) of 14.2% over the last 5 years, far outpacing conventional fixed income yields."
      </blockquote>

      <h2>Investment Potential: Plotted Developments vs. Apartments</h2>
      <p>For investors prioritizing capital protection and high returns, open plots and gated layout communities in Devanahalli offer significant advantages over residential apartments. Land holds intrinsic scarcity, incurs minimal maintenance costs, and benefits directly from macro infrastructure developments without building depreciation.</p>

      <h3>Key Investment Takeaways</h3>
      <ol>
        <li>Target RERA-approved and BIAPPA (Bengaluru International Airport Area Planning Authority) sanctioned layouts.</li>
        <li>Opt for plots along key arterial roads like NH-44, Doddaballapur Road, or STRR intersections.</li>
        <li>Plan for a holding horizon of 3 to 7 years to capture maximum appreciation milestones.</li>
      </ol>
    `,
    coverImage: '/hero-skyscraper.jpg',
    author: {
      name: 'Rohan Varma',
      role: 'Senior Real Estate Strategist',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      bio: 'Specializing in Bengaluru real estate market analysis, land layout verification, and structured wealth deployment strategies for retail and institutional investors.',
    },
    readTime: '6 min read',
    publishedAt: '2026-08-12T00:00:00.000Z',
    status: BlogStatus.PUBLISHED,
    featured: true,
    tags: ['Devanahalli', 'North Bengaluru', 'Plotted Development', 'BIAPPA', 'Capital Growth'],
    views: 1420,
    seo: {
      metaTitle: 'North Bengaluru Growth Corridor: Why Devanahalli is the Next Investment Hotspot | 1ASET',
      metaDescription: 'Discover why Devanahalli is North Bengaluru premier land investment destination. Airport expansion, ITIR, STRR connectivity, and capital growth metrics.',
      keywords: ['Devanahalli plots', 'North Bengaluru land investment', 'BIAPPA plots', '1ASET advisory'],
      ogImage: '/hero-skyscraper.jpg',
    },
  },
  {
    slug: 'fractional-vs-direct-land-ownership-bengaluru',
    title: "Fractional vs Direct Land Ownership in Bengaluru: A 2026 Investor's Guide",
    category: 'Investment Strategy',
    excerpt:
      'Navigating entry barrier costs, liquidity, title security, and risk profiles between owning prime land outright versus fractional asset ownership.',
    content: `
      <h2>Redefining Real Estate Access</h2>
      <p>Historically, commercial real estate and prime land parcels in tier-1 Indian metros were accessible only to high-net-worth individuals (HNIs) and institutional funds. Today, alternative investment platforms and structured direct land acquisition models are democratizing access to high-yield Bengaluru assets.</p>

      <h2>Comparing the Models</h2>
      <p>When assessing land investment strategies, investors must carefully weigh title ownership, governance, liquidity, and overall yield potential.</p>

      <h3>1. Direct Land Ownership (Open Plots & Managed Land)</h3>
      <p>Direct ownership grants 100% legal title and deed registration in your name. In high-growth zones like Sarjapur-Attibele, Yelahanka, and Kanakapura Road, direct plot ownership provides total autonomy over asset utilization, future construction, or resale timing.</p>

      <h3>2. Fractional Property Ownership</h3>
      <p>Fractional ownership allows multiple investors to pool funds into a Special Purpose Vehicle (SPV) holding commercial office spaces or premium warehousing assets, earning fractional rental distributions and capital gain on exit.</p>

      <h2>Which Model Suits You Best?</h2>
      <p>If your objective is maximizing capital appreciation with full legal control over the deed, direct land ownership in RERA-approved micro-markets remains king. For passive quarterly cashflows with lower capital outlay, fractional commercial assets present a complementary allocation strategy.</p>
    `,
    coverImage: '/property-1.jpg',
    author: {
      name: 'Ananya Rao',
      role: 'Head of Investment Advisory',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
      bio: 'Advising private family offices and ultra-HNIs on institutional asset allocation across Bengaluru prime growth corridors.',
    },
    readTime: '8 min read',
    publishedAt: '2026-08-05T00:00:00.000Z',
    status: BlogStatus.PUBLISHED,
    featured: false,
    tags: ['Fractional Ownership', 'Land Investment', 'ROI', 'Bengaluru', 'Wealth Management'],
    views: 980,
    seo: {
      metaTitle: "Fractional vs Direct Land Ownership Bengaluru | 1ASET Guide",
      metaDescription: "Detailed comparison between fractional real estate ownership and direct title land deeds in Bengaluru. Returns, risks, liquidity, and governance.",
      keywords: ['Fractional land ownership', 'Direct land purchase', 'Bengaluru property investment'],
      ogImage: '/property-1.jpg',
    },
  },
  {
    slug: 'rera-and-title-clearance-open-plots-guide',
    title: 'Understanding RERA & Title Clearance Before Investing in Open Plots',
    category: 'Legal & RERA',
    excerpt:
      'Essential legal due diligence checklist: Verify BDA/BMRDA approvals, Khata certificate authenticity, encumbrance records, and RERA registration compliance.',
    content: `
      <h2>Why Due Diligence is Non-Negotiables in Land Deals</h2>
      <p>Land investment in India offers tremendous upside, but legal title errors, unapproved layout conversions, or encumbrances can turn a lucrative opportunity into litigation. Understanding the mandatory regulatory clearances protects your hard-earned capital.</p>

      <h2>The Essential 6-Step Verification Checklist</h2>
      <ol>
        <li><strong>Title Deed & Parent Documents:</strong> Verify continuous, clear ownership chain for at least 30 years with an independent advocate.</li>
        <li><strong>Agricultural to Non-Agricultural Conversion (DC Conversion):</strong> Ensure Section 95 approval for land conversion to residential or commercial use.</li>
        <li><strong>Planning Authority Approval:</strong> Check for BDA, BMRDA, BIAPPA, or MPA layout approvals. Unapproved layouts risk demolition or penalty notices.</li>
        <li><strong>RERA Registration:</strong> Confirm project registration status on the Karnataka RERA portal (rera.karnataka.gov.in).</li>
        <li><strong>Encumbrance Certificate (EC):</strong> Obtain Form 15 EC for the past 30 years to verify the property is free from mortgages, liens, or legal disputes.</li>
        <li><strong>A Khata & e-Khata Issuance:</strong> Verify BBMP or Gram Panchayat Khata registration for seamless property taxation and loan eligibility.</li>
      </ol>
    `,
    coverImage: '/property-2.jpg',
    author: {
      name: 'Siddharth Mehta',
      role: 'Legal & Compliance Specialist',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
      bio: 'Veteran legal counsel specializing in Karnataka land revenue codes, title deeds verification, and RERA compliance standards.',
    },
    readTime: '7 min read',
    publishedAt: '2026-07-28T00:00:00.000Z',
    status: BlogStatus.PUBLISHED,
    featured: false,
    tags: ['RERA', 'Legal Due Diligence', 'A-Khata', 'DC Conversion', 'Property Law'],
    views: 1850,
    seo: {
      metaTitle: 'RERA & Title Clearance Guide for Open Plots | 1ASET',
      metaDescription: '6-step legal verification checklist for buying open plots in Bengaluru: BDA, BMRDA, RERA, EC, and DC conversion documentation.',
      keywords: ['RERA layout approval', 'Title clearance checklist', 'A-Khata verification'],
      ogImage: '/property-2.jpg',
    },
  },
  {
    slug: 'top-5-emerging-micro-markets-bengaluru-high-roi',
    title: 'Top 5 Emerging Micro-Markets in Bengaluru for High Annual ROI',
    category: 'Micro-Markets',
    excerpt:
      'From Whitefield Extension to Hoskote and Kanakapura Corridor: Discover where infrastructure investment is unlocking massive property yield potential.',
    content: `
      <h2>Where Capital Meets Infra Acceleration</h2>
      <p>Not all areas in Bengaluru appreciate at the same rate. Identifying micro-markets during early infrastructure execution stages yields exponentially higher returns than investing in mature, saturated urban pockets.</p>

      <h2>Top 5 High-Growth Zones for 2026–2030</h2>
      
      <h3>1. Hoskote & Old Madras Road Corridor</h3>
      <p>Driven by the Bengaluru-Chennai Expressway, auto-industrial clusters, and upcoming industrial parks. Land values are projecting a steady 12-15% annual growth.</p>

      <h3>2. Sarjapur-Attibele Belt</h3>
      <p>Proximity to Ranga Shankara, Wipro SEZ, and Outer Ring Road tech hubs combined with affordable entry pricing make this an investor favorite for villa plots.</p>

      <h3>3. Yelahanka & Doddaballapur Road</h3>
      <p>Benefiting from aerospace hubs, educational institutes, and seamless connectivity to KIAL Airport.</p>

      <h3>4. Kanakapura Road Corridor</h3>
      <p>Green surroundings, Metro Green Line operationalization, and proximity to NICE Road connectivity to Mysore Expressway.</p>

      <h3>5. Budigere Cross & Mandur</h3>
      <p>Seamlessly bridging Whitefield tech corridor with North Bengaluru airport highway.</p>
    `,
    coverImage: '/property-3.jpg',
    author: {
      name: 'Rohan Varma',
      role: 'Senior Real Estate Strategist',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      bio: 'Specializing in Bengaluru real estate market analysis, land layout verification, and structured wealth deployment strategies.',
    },
    readTime: '5 min read',
    publishedAt: '2026-07-15T00:00:00.000Z',
    status: BlogStatus.PUBLISHED,
    featured: false,
    tags: ['Micro-Markets', 'Hoskote', 'Sarjapur', 'Yelahanka', 'Bengaluru ROI'],
    views: 1210,
    seo: {
      metaTitle: 'Top 5 Emerging Micro-Markets in Bengaluru for High ROI | 1ASET',
      metaDescription: 'Explore the 5 fastest appreciating land investment zones in Bengaluru. High-growth corridors, metro connectivity, and return projections.',
      keywords: ['Bengaluru micro-markets', 'High ROI plots Bengaluru', 'Hoskote plots', 'Sarjapur land'],
      ogImage: '/property-3.jpg',
    },
  },
  {
    slug: 'tax-implications-real-estate-capital-gains-india-2026',
    title: 'Tax Implications of Real Estate Capital Gains in India (2026 Edition)',
    category: 'Property Guides',
    excerpt:
      'A comprehensive analysis of short-term vs long-term capital gains, indexation benefits, Section 54/54F reinvestment strategies, and tax optimization.',
    content: `
      <h2>Optimizing Your Post-Tax Real Estate Returns</h2>
      <p>Maximizing returns on real estate investments requires thorough tax planning. Understanding capital gain classifications and available exemptions can save property investors millions in tax liabilities upon asset disposition.</p>

      <h2>Short-Term vs Long-Term Capital Gains (STCG vs LTCG)</h2>
      <p>For immovable property (land and buildings), the holding period threshold determines tax treatment:</p>
      <ul>
        <li><strong>Short-Term Capital Asset:</strong> Held for 24 months or less. Taxed as per the investor’s applicable income tax slab rate.</li>
        <li><strong>Long-Term Capital Asset:</strong> Held for more than 24 months. Taxed at statutory LTCG rates with or without indexation based on current tax provisions.</li>
      </ul>

      <h2>Key Tax Saving Options (Section 54, 54F & 54EC)</h2>
      <ol>
        <li><strong>Section 54:</strong> Exemption available when selling residential house property and reinvesting proceeds in another residential unit in India.</li>
        <li><strong>Section 54F:</strong> Exemption when selling non-residential land or plots and investing total net consideration into a residential property within specified timelines.</li>
        <li><strong>Section 54EC Capital Gains Bonds:</strong> Invest capital gains up to ₹50 Lakhs in specified NHAI or REC bonds for a 5-year lock-in period.</li>
      </ol>
    `,
    coverImage: '/hero-skyscraper.jpg',
    author: {
      name: 'Ananya Rao',
      role: 'Head of Investment Advisory',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
      bio: 'Advising private family offices and ultra-HNIs on institutional asset allocation across Bengaluru prime growth corridors.',
    },
    readTime: '9 min read',
    publishedAt: '2026-07-02T00:00:00.000Z',
    status: BlogStatus.PUBLISHED,
    featured: false,
    tags: ['Capital Gains', 'Tax Planning', 'Section 54F', 'Income Tax', 'Real Estate Guide'],
    views: 1640,
    seo: {
      metaTitle: 'Real Estate Capital Gains Tax Guide India 2026 | 1ASET',
      metaDescription: 'Understand STCG vs LTCG on property sales in India. Exemption rules under Section 54, 54F, 54EC, and indexation calculation.',
      keywords: ['Capital gains real estate', 'Section 54F land', 'LTCG property India'],
      ogImage: '/hero-skyscraper.jpg',
    },
  },
  {
    slug: 'commercial-vs-residential-real-estate-rental-yields',
    title: 'Commercial vs Residential Real Estate: Which Yields Higher Rental Returns?',
    category: 'Market Trends',
    excerpt:
      'Comparing gross rental yields, lease lock-in periods, tenant stability, and capital expenditure demands in Bengaluru’s thriving market.',
    content: `
      <h2>The Age-Old Investor Debate: Commercial vs. Residential</h2>
      <p>When selecting property for income generation, yield performance varies sharply between residential apartments/villas and commercial office spaces or warehousing units.</p>

      <h2>Rental Yield Comparison in Bengaluru</h2>
      <p>Gross rental yield measures annual rental income as a percentage of the total property acquisition cost:</p>
      <ul>
        <li><strong>Residential Properties:</strong> Average rental yield ranges between <strong>2.5% to 4.0%</strong> per annum.</li>
        <li><strong>Commercial Properties:</strong> Gross yields average between <strong>7.0% to 10.5%</strong> per annum, backed by 3 to 9-year corporate leases.</li>
        <li><strong>Plotted Developments:</strong> Zero immediate rental yield, but delivers <strong>12% to 18%+</strong> annual capital appreciation without tenant vacancy risks.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>A balanced portfolio often allocates core growth capital into strategic open plots for compounding wealth, while deploying secondary surplus into commercial yields for predictable monthly cash flow.</p>
    `,
    coverImage: '/property-1.jpg',
    author: {
      name: 'Siddharth Mehta',
      role: 'Legal & Compliance Specialist',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
      bio: 'Veteran legal counsel specializing in Karnataka land revenue codes, title deeds verification, and RERA compliance standards.',
    },
    readTime: '6 min read',
    publishedAt: '2026-06-20T00:00:00.000Z',
    status: BlogStatus.PUBLISHED,
    featured: false,
    tags: ['Commercial Real Estate', 'Rental Yield', 'Residential', 'Passive Income'],
    views: 1100,
    seo: {
      metaTitle: 'Commercial vs Residential Rental Yields Bengaluru | 1ASET',
      metaDescription: 'Compare rental returns on commercial real estate vs residential apartments and plotted developments in Bengaluru.',
      keywords: ['Commercial rental yield', 'Residential property yield', 'Bengaluru real estate returns'],
      ogImage: '/property-1.jpg',
    },
  },
];

@Injectable()
export class BlogsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(BlogsService.name);

  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedInitialBlogs();
  }

  async seedInitialBlogs() {
    try {
      for (const blogData of INITIAL_BLOGS) {
        const existing = await this.blogModel.findOne({ slug: blogData.slug }).exec();
        if (!existing) {
          this.logger.log(`Seeding initial blog: ${blogData.title} (${blogData.slug})`);
          await this.blogModel.create(blogData);
        }
      }
    } catch (err: any) {
      this.logger.error(`Error during initial blogs seeding: ${err.message}`, err.stack);
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

  async findAll(query: QueryBlogDto): Promise<Blog[]> {
    const filter: Record<string, any> = {};

    // Filter by Category
    if (query.category && query.category !== 'All') {
      filter.category = query.category;
    }

    // Filter by Status: If not explicitly admin, enforce PUBLISHED
    if (query.status && query.status !== 'All') {
      filter.status = query.status;
    } else if (!query.admin) {
      filter.status = BlogStatus.PUBLISHED;
    }

    // Filter by Featured
    if (query.featured !== undefined) {
      filter.featured = query.featured;
    }

    // Filter by Tag
    if (query.tag) {
      filter.tags = query.tag;
    }

    // Search
    if (query.search?.trim()) {
      const s = query.search.trim();
      filter.$or = [
        { title: { $regex: s, $options: 'i' } },
        { excerpt: { $regex: s, $options: 'i' } },
        { tags: { $regex: s, $options: 'i' } },
      ];
    }

    let queryBuilder = this.blogModel.find(filter).sort({ publishedAt: -1, createdAt: -1 });

    if (query.limit) {
      const page = query.page || 1;
      const skip = (page - 1) * query.limit;
      queryBuilder = queryBuilder.skip(skip).limit(query.limit);
    }

    return queryBuilder.exec();
  }

  async findFeatured(): Promise<Blog[]> {
    return this.blogModel
      .find({ featured: true, status: BlogStatus.PUBLISHED })
      .sort({ publishedAt: -1 })
      .limit(6)
      .exec();
  }

  async findBySlug(slug: string, isAdmin = false): Promise<Blog> {
    const filter: Record<string, any> = { slug };
    if (!isAdmin) {
      filter.status = BlogStatus.PUBLISHED;
    }

    const blog = await this.blogModel
      .findOneAndUpdate(filter, { $inc: { views: 1 } }, { new: true })
      .exec();

    if (!blog) {
      throw new NotFoundException(`Blog post with slug "${slug}" not found`);
    }

    return blog;
  }

  async findById(id: string): Promise<Blog> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`Invalid blog ID: ${id}`);
    }
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }
    return blog;
  }

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const slug = createBlogDto.slug
      ? this.slugify(createBlogDto.slug)
      : this.slugify(createBlogDto.title);

    const existing = await this.blogModel.findOne({ slug }).exec();
    if (existing) {
      throw new ConflictException(`Blog post with slug "${slug}" already exists`);
    }

    const newBlog = new this.blogModel({
      ...createBlogDto,
      slug,
      status: createBlogDto.status || BlogStatus.DRAFT,
      publishedAt:
        createBlogDto.status === BlogStatus.PUBLISHED
          ? createBlogDto.publishedAt || new Date().toISOString()
          : createBlogDto.publishedAt || new Date().toISOString(),
    });

    return newBlog.save();
  }

  async update(id: string, updateBlogDto: Partial<CreateBlogDto>): Promise<Blog> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`Invalid blog ID: ${id}`);
    }

    if (updateBlogDto.slug) {
      updateBlogDto.slug = this.slugify(updateBlogDto.slug);
      const existing = await this.blogModel
        .findOne({ slug: updateBlogDto.slug, _id: { $ne: id } })
        .exec();
      if (existing) {
        throw new ConflictException(`Blog with slug "${updateBlogDto.slug}" already exists`);
      }
    }

    const updated = await this.blogModel
      .findByIdAndUpdate(id, { $set: updateBlogDto }, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }

    return updated;
  }

  async updateStatus(id: string, status: BlogStatus): Promise<Blog> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`Invalid blog ID: ${id}`);
    }

    const updatePayload: Record<string, any> = { status };
    if (status === BlogStatus.PUBLISHED) {
      updatePayload.publishedAt = new Date().toISOString();
    }

    const updated = await this.blogModel
      .findByIdAndUpdate(id, { $set: updatePayload }, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }

    return updated;
  }

  async remove(id: string): Promise<Blog> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException(`Invalid blog ID: ${id}`);
    }
    const deleted = await this.blogModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Blog post with ID "${id}" not found`);
    }
    return deleted;
  }
}
