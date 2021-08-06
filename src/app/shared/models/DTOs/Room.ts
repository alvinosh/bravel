import { Message } from './Message';
import { User } from './User';

export interface RoomRequest {
  name: string;
  users: string[];
  admins: string[];
}

export interface Room {
  id: number;
  name: string;
  users: User[];
  admins: User[];
  owner: User;
  messages: Message[];
}
