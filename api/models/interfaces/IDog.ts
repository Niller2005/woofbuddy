import Reservation from '../Reservation';

export interface IDog {
  id?: number;
  name: string;
  race: string;
  age: number;
  reservations?: Reservation[];
}
