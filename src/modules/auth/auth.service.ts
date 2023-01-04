import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Utils } from 'src/common/utils';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';

export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    private jwtService: JwtService
  ) {}

  public async validateUser(email: string, password: string) {
    const { data } = await this.userService.findOne({
      where: {
        email,
        deleted_at: null,
      },
    });
    const plainPassword = data && Utils.decodeString(data.password);

    return plainPassword === password ? data : null;
  }

  public async checkUserExist(id: string) {
    return await this.userService.findOne({
      where: {
        deleted_at: null,
        id,
      },
    });
  }

  public async login(payload: LoginDto) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
