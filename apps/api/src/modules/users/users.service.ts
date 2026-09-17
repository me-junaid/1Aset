import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.seedInitialAdmin();
  }

  private async seedInitialAdmin() {
    const adminEmail =
      this.configService.get<string>('ADMIN_EMAIL') || 'admin@1aset.com';
    const adminPassword =
      this.configService.get<string>('ADMIN_PASSWORD') || 'Admin@1aset2026';

    const existingAdmin = await this.userModel.findOne({ email: adminEmail.toLowerCase() }).exec();
    if (!existingAdmin) {
      this.logger.log(`No admin found. Seeding initial admin: ${adminEmail}`);
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(adminPassword, salt);

      await this.userModel.create({
        name: 'Super Admin',
        email: adminEmail.toLowerCase(),
        passwordHash,
        role: 'ADMIN',
        isActive: true,
      });
      this.logger.log(`Admin account seeded successfully.`);
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { lastLogin: new Date() }).exec();
  }
}
