import 'reflect-metadata';

import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import Dog from './Dog';
import Park from './Parks';

@Entity()
export default class Reservation {
  constructor() {}

  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(type => Park, park => park.reservations)
  park: Park;

  @ManyToMany(type => Dog, dog => dog.reservations)
  @JoinTable()
  dogs: Dog[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
