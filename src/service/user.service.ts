import { Provide, Singleton } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

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

  async verifyUser(userId: string, password: string) {
    const user = await this.usersModel.findOne({
      where: { userId },
    });

    if (user) {
      const result = await compare(password, user.pwdHash);
      if (true === result) {
        user.lastLogin = new Date();
        this.usersModel.save(user);
        return true;
      }
    }
    return false;
  }
}
