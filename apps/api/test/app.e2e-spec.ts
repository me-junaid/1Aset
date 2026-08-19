import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import type { ApiResponse, User } from '@repo/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect((res: request.Response) => {
        const body = res.body as ApiResponse<User>;
        expect(body.status).toBe(200);
        expect(body.data.name).toBe('NestJS Backend API');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
