import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './modules/blogs/blogs.module';
import { WhatsappOtpModule } from './modules/whatsapp-otp/whatsapp-otp.module';
import { LeadsModule } from './modules/leads/leads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') ||
          'mongodb+srv://jdasjunaid_db_user:HmTzw1c0PimVriqA@cluster0.6prs2au.mongodb.net/1aset?appName=Cluster0',
      }),
    }),
    BlogsModule,
    WhatsappOtpModule,
    LeadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


