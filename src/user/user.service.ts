import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/crerateUser.dto';
import { UserEntity } from './interfaces/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(CreateUserDto: CreateUserDto): Promise<UserEntity> {
    const hash = await bcrypt.hash(CreateUserDto.password, 10);

    return this.userRepository.save({
      ...CreateUserDto,
      typeUser: 1,
      password: hash,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
