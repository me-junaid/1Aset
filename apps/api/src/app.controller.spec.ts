import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('user', () => {
    it('should return user details', () => {
      const response = appController.getUser();
      expect(response.status).toBe(200);
      expect(response.data.name).toBe('NestJS Backend API');
    });
  });
});
