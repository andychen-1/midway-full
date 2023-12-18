## 使用 MySQL8

* [MySQL8.0 安装](https://zhuanlan.zhihu.com/p/463660768)
* [Midway 数据存储 TypeORM](https://midwayjs.org/docs/extensions/orm)
* [TypeORM 官方文档](https://typeorm.io/)

### 数据库操作
```bash
## 当前本地调试的环境为 windows10 WSL1/Ubuntu
# 启动 mysql 服务
$ service mysql start
# 导入数据 (midway-full-react/scripts/midwayfull.sql)
$ mysql -u root -p1Qaz@wsx midwayfull < .../midway-full-react/scripts/midwayfull.sql
# cd <midway-full-react>; 生成数据库实体（实体名遵循大驼峰命名）
$ npm run generate:entities # 默认目录 src/enities/*.entity.ts
```

### 数据库实体
```typescript
//~ src/entities/Users.entity.ts
// database: midwayfull, table: users
import { Column, Entity } from 'typeorm';

@Entity('users', { schema: 'midwayfull' })
export class Users {
  @Column('varchar', {
    primary: true,
    name: 'user_id',
    comment: '用户ID',
    length: 20,
  })
  userId: string;

  @Column('varchar', { name: 'user_name', comment: '用户名', length: 128 })
  userName: string;

  @Column('varchar', { name: 'pwd_hash', comment: '密码哈希', length: 64 })
  pwdHash: string;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '邮箱',
    length: 255,
  })
  email: string | null;

  @Column('timestamp', { name: 'created_at', comment: '创建时间' })
  createdAt: Date;

  @Column('timestamp', {
    name: 'last_login',
    nullable: true,
    comment: '最后登录时间',
  })
  lastLogin: Date | null;
}
```


### 数据源

```typescript
//~ src/config/config.default.ts
import { MidwayConfig } from '@midwayjs/core';

export default {
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        database: 'midwayfull',
        username: 'root',
        password: '1Qaz@wsx',
        // 慎用 'synchronize' 选项，默认情况下可以手动导入数据，然后使用 generate:entities 生成实体
        synchronize: false, 
        logging: true,
        entities: ['**/entities/*.entity{.ts,.js}'],
      },
    },
  },
  // ...
} as MidwayConfig;
```

### 数据库访问示例

```typescript
//~ src/service/user.service.ts
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
```
