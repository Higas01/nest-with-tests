import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {

  constructor(
    @Inject("USER_MODEL")
    private userModel: Model<User>
  ) {

  }

  async create(createUserDto: CreateUserDto): Promise<User | string> {

      if (!createUserDto.age || !createUserDto.job || !createUserDto.name) {
        throw new HttpException('Todos os campos precisam ser preenchidos!', HttpStatus.BAD_REQUEST);

      }

      const result = await this.userModel.create(createUserDto);
    return result;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }
}
