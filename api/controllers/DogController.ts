import 'reflect-metadata';
import {
  Authorized,
  JsonController,
  Get,
  Post,
  Body,
  Delete,
  OnUndefined,
  Param,
  NotFoundError
} from 'routing-controllers';
import { getConnection } from 'typeorm';
import Dog from '../models/Dog';

@Authorized()
@JsonController('/api/dogs')
export default class DogController {
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

  @Post('/')
  async post(@Body() dog: Dog) {
    return await this.getRepo().persist(dog);
  }

  @Delete('/:id')
  @OnUndefined(204)
  async remove(@Param('id') id: number) {
    let existingDog = await this.getRepo().findOneById(id);
    if (!existingDog) {
      throw new NotFoundError('Not found');
    } else {
      let result = await this.getRepo().remove(existingDog);
    }
  }

  private getRepo() {
    return getConnection().getRepository(Dog);
  }
}
