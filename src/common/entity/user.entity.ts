import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '用户名', length: 30, unique: true })
  username: string;

  @Column({ comment: '昵称', length: 30 })
  pickName: string;

  @Column({ comment: '密码', length: 150 })
  password: string;

  @Column({ comment: '性别0未知男1女2', default: 0 })
  sex: number;

  @Column({ comment: '联系方式', length: 12 })
  tel: string;

  @Column({ comment: '超级管理员', default: 0, enum: [0, 1], type: 'tinyint' })
  is_super: number;

  @Column({ comment: '登录时间' })
  loginTime: number;

  @Column({ comment: '登录ip' })
  loginIp: string;

  @Column({ comment: '生效状态', default: 1, type: 'tinyint' })
  status: number;

  @Column({ comment: '创建者' })
  creator_id: number;

  @Column({ comment: '排序', default: 100 })
  sort: number;

  @Column({ comment: '修改时间' })
  updateTime: number;

  @Column({ comment: '创建时间', default: new Date().getTime() / 1000 })
  addTime: number;
}