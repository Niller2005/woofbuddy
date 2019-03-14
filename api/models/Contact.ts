import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IContact } from './interfaces/IContact';
import { IsEmail, IsOptional, MinLength } from './Validators';

@Entity()
export default class Contact implements IContact {
  constructor(initializer: Partial<Contact>) {
    if (initializer) {
      Object.assign(this, initializer);
    }
  }

  @PrimaryGeneratedColumn() id: number;

  @Column()
  @MinLength(3)
  lastName: string;

  @Column()
  @MinLength(1)
  firstName: string;

  @Column()
  @IsOptional()
  @MinLength(7)
  phone: string;

  @Column()
  @IsOptional()
  @IsEmail()
  email: string;
}
