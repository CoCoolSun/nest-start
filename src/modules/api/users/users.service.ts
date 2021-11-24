import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { User } from "../../../common/entity/user.entity"
import { hash } from 'node-php-password';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  login(username: string): Promise<User | undefined> {
    // return this.userRepository.findOne({ username }, { relations: ['roles']})
    return this.userRepository.findOne({ username })
  }
}
