import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return await this.service.login({
      id: req.user.id,
      email: req.user.email,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async profile(@Req() req) {
    return req.user;
  }
}
