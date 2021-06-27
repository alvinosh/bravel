import { Location } from './Location';

export interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  location: Location;
}
