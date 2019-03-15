import Park from '../Parks';

export interface IReservation {
  id?: number;
  date: string;
  park: Park;
}
