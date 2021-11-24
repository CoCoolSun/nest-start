import { Injectable } from '@nestjs/common';
import { UsersService } from "../api/users/users.service";
import { verify } from 'node-php-password';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user =await this.usersService.login(username);
    if (user && verify(pass, user.password)) {
      const {password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const { username, ...info } = user;
    const payload = { username: user.username, sub: info };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
