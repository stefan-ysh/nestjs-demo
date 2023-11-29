import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}
  async create(createUserDto: CreateUserDto) {
    //  确定username为唯一的
    const user = await this.userRepository.findOne({ where: { username: createUserDto.username} });
    if (user) {
      throw new HttpException('用户已存在', 400)
    } else {
      return await this.userRepository.save(createUserDto);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log('[ updateUserDto ] >', updateUserDto)
    const qb = await this.userRepository.createQueryBuilder();
    const res =  await qb.update().set(updateUserDto).where({ id }).execute();
    const { affected } = res;
    if (affected > 0) {
      return await this.userRepository.findOne({ where: { id } });
    } else {
      return null;
    }
  }

  async remove(id: number) {
    const { affected } = await this.userRepository.delete({ id });
    if (affected > 0) {
      return true;
    } else {
      return false;
    }
  }
}
