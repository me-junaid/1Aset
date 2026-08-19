import { Injectable } from '@nestjs/common';
import type { User, ApiResponse } from '@repo/types';
import { formatUserName } from '@repo/utils';

@Injectable()
export class AppService {
  getUser(): ApiResponse<User> {
    const user: User = {
      id: '2',
      name: 'NestJS Backend API',
      email: 'api@example.com',
    };

    return {
      status: 200,
      message: `Successfully retrieved user: ${formatUserName(user)}`,
      data: user,
    };
  }
}
