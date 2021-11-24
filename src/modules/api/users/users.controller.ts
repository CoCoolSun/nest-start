import {Controller, Get, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import pathConfig from '../../../config/BaseConfig';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import { UsersService } from "./users.service";
import {LocalAuthGuardJwt} from "../../auth/localAuthGuardJwt";
@ApiTags('用户API文档')
@ApiBearerAuth()
@Controller(`${pathConfig.BACKENDAPI}/users`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  @ApiOperation({summary: '获取用户列表', description: '用户列表'})
  findAll() {
    return '用户列表'
  }

  @Get(':id')
  @UseGuards(LocalAuthGuardJwt)
  @ApiOperation({summary: '获取一条用户查询', description: '查询当前id用户信息'})
  @ApiParam({name: 'id'})
  findOne(@Param('id', new ParseIntPipe()) id) {
    return '用户查询'
  }

  // @Post('fuser')
  // @ApiOperation({summary: '获取一条用户查询', description: '获取登录信息'})
  // @ApiBody({description: '填写更新内容'})
  // findUser() {
  //   return '登录API'
  // }
}
