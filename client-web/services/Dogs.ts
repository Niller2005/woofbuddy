import RestUtilities from './RestUtilities';
import { IDog } from '../../api/models/interfaces/IDog';
export { IDog };

export default class Dogs {
  fetchAll() {
    return RestUtilities.get<Array<IDog>>('/api/dogs');
  }

  fetch(id: number) {
    return RestUtilities.get<IDog>(`/api/dogs/${id}`);
  }

  update(dog: IDog) {
    return RestUtilities.put<IDog>(`/api/dogs/${dog.id}`, dog);
  }

  create(dog: IDog) {
    return RestUtilities.post<IDog>('/api/dogs', dog);
  }

  save(dog: IDog) {
    if (dog.id) {
      return this.update(dog);
    } else {
      return this.create(dog);
    }
  }

  delete(id: number) {
    return RestUtilities.delete(`/api/dogs/${id}`);
  }
}
