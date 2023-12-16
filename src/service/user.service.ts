import { Provide, Singleton } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users.entity.js';
import { IUserOptions } from '../interface.js';

@Provide()
@Singleton()
export class UserService {
  @InjectEntityModel(Users)
  usersModel: Repository<Users>;

  async getUser(options: IUserOptions) {
    return await this.usersModel.findOne({
      where: options,
      select: ['userId', 'email', 'userName'],
    });
  }
}
