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
