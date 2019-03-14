import RestUtilities from './RestUtilities';
import { IPark } from '../../api/models/interfaces/IPark';
export { IPark };

export default class Parks {
  fetchAll() {
    return RestUtilities.get<Array<IPark>>('/api/parks');
  }

  fetch(id: number) {
    return RestUtilities.get<IPark>(`/api/parks/${id}`);
  }
}
