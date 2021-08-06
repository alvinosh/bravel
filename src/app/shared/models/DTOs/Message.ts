import { Room } from './Room';
import { User } from './User';

export interface Message {
  id: number;
  sender: User;
  room_id: number;
  content: string;
}

export interface MessageRequest {
  room_id: number;
  message: string;
}
