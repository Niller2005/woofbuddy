import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import Reservation from './Reservation';

@Entity()
export default class Park {
  constructor() {}

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  point: string;

  @Column()
  lat: string;

  @Column()
  lon: string;

  @OneToMany(type => Reservation, reservation => reservation.park)
  reservations: Reservation[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
