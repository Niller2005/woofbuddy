import RestUtilities from './RestUtilities';
import { IReservation } from '../../api/models/interfaces/IReservation';
export { IReservation };

export default class Reservations {
  fetchAll() {
    return RestUtilities.get('/api/reservations');
  }

  fetch(id: number) {
    return RestUtilities.get(`/api/reservations/${id}`);
  }

  update(reservation: IReservation) {
    return RestUtilities.put(
      `/api/reservations/${reservation.id}`,
      reservation
    );
  }

  create(reservation: IReservation) {
    return RestUtilities.post('/api/reservations', reservation);
  }

  save(reservation: IReservation) {
    if (reservation.id) {
      return this.update(reservation);
    } else {
      return this.create(reservation);
    }
  }
  delete(id: number) {
    return RestUtilities.delete(`/api/reservations/${id}`);
  }
}
