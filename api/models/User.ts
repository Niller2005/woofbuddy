import 'reflect-metadata';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { IsEmail, MinLength } from './Validators';

@Entity()
export default class User {
  constructor() {
    this.emailConfirmed = false;
    this.admin = false;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  emailConfirmed: boolean;

  @Column()
  admin: boolean;

  @Column()
  @MinLength(5)
  hashedPassword: string;

  @Column('jsonb', { nullable: true })
  meta: any;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
