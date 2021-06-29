import { Location } from './Location';

export interface User {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  online: boolean;
  location: Location;
}
