import 'reflect-metadata';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { IDog } from './interfaces/IDog';
import { MinLength } from './Validators';
import Reservation from './Reservation';

@Entity()
export default class Dog implements IDog {
  constructor() {}

  @PrimaryGeneratedColumn() id: number;

  @Column()
  @MinLength(3)
  name: string;

  @Column()
  @MinLength(1)
  race: string;

  @Column()
  @MinLength(1)
  age: number;

  @ManyToMany(type => Reservation, reservation => reservation.dogs)
  reservations: Reservation[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
