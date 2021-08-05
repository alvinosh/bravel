import { User } from './User';

export interface RoomRequest {
  name: string;
  users: string[];
  admins: string[];
}

export interface Room {
  name: string;
  users: User[];
  admins: User[];
  owner: User;
}
