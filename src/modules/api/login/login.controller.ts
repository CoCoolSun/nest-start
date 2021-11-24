import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
// import { LocalAuthGuardJwt } from '../../auth/localAuthGuardJwt';
import { AuthService } from '../../auth/auth.service';
import { LoginInfoDto } from "./loginInfo.dto";
import pathConfig from '../../../config/baseConfig';

@ApiTags('登录接口文档')
@Controller(`${pathConfig.BACKENDAPI}/login`)
export class LoginController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: '登录页面' })
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req, @Body() loginInfoDto: LoginInfoDto) {
    return await this.authService.login(req.user);
  }

  // @ApiOperation({ summary: '测试登录鉴权' })
  // @UseGuards(LocalAuthGuardJwt)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
