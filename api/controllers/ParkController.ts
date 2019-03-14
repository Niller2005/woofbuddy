import 'reflect-metadata';
import { JsonController, Get, Param, Authorized } from 'routing-controllers';
import { getConnection } from 'typeorm';
import Park from '../models/Parks';

@Authorized()
@JsonController('/api/parks')
export default class ParkController {
  @Get('/')
  async getAll() {
    return await this.getRepo().find();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    if (id) {
      return await this.getRepo().findOneById(id);
    }
  }

  private getRepo() {
    return getConnection().getRepository(Park);
  }
}
