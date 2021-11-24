import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // constructor(private readonly authService: AuthService) {
  //   super();
  // }
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  // async validate(username: string, password: string): Promise<any> {
  //   const user = await this.authService.validateUser(username,password);
  //   if (!user) {
  //     throw new HttpException({ message: 'authorized failed', error: 'please try again later.' },HttpStatus.BAD_REQUEST);
  //   }
  //   return user;
  // }
  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<any> {
    const contextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    // console.log(contextId);
    const user = await authService.validateUser(username, password);
    if (!user) {
      throw new HttpException({ message: 'authorized failed', error: 'please try again later.' },HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}