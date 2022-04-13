import { Location } from './Location';

export interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  online: boolean;
  location: Location;

  accessToken: string;
  refreshToken: string;
}
