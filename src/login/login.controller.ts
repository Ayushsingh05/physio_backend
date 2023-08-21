import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { secret_key, userDetails } from './config';

@Controller('api')
export class LoginController {
  @Post('login_v1')
  async login(@Body() loginData: any) {
    const token = jwt.sign({ uid: userDetails.uid }, secret_key, {
      expiresIn: '5d',
    });
    if (
      loginData.uid === userDetails.uid &&
      loginData.password === userDetails.password
    ) {
      return {
        token: token,
      };
    }
    throw new UnauthorizedException('Wrong credentials.');
  }
  @Get('dashboard')
  getDashboardAccess() {
    return { status: 'success', message: 'Welcome to Dashboard' };
  }
}
