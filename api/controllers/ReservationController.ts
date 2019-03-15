import 'reflect-metadata';
import {
  Authorized,
  JsonController,
  Get,
  Param,
  Post,
  Body,
  Delete,
  OnUndefined,
  NotFoundError
} from 'routing-controllers';
import Reservation from '../models/Reservation';
import { getConnection } from 'typeorm';

@JsonController('/api/reservations')
export default class ReservationController {
  @Get('/')
  async getAll() {
    return await this.getRepo()
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.park', 'park')
      .getMany();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    if (id) {
      return await this.getRepo()
        .createQueryBuilder('reservation')
        .leftJoinAndSelect('reservation.park', 'park')
        .where('reservation.id = :id', { id: id })
        .getOne();
    }
  }

  @Post('/')
  async post(@Body() reservation: any) {
    return await this.getRepo().persist(reservation);
  }

  @Delete('/:id')
  @OnUndefined(204)
  async remove(@Param('id') id: number) {
    let existingReservation = await this.getRepo().findOneById(id);
    if (!existingReservation) {
      throw new NotFoundError('Not found');
    } else {
      let result = await this.getRepo().remove(existingReservation);
    }
  }

  private getRepo() {
    return getConnection().getRepository(Reservation);
  }
}
