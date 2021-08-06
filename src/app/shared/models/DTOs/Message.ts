import { Room } from './Room';
import { User } from './User';

export interface Message {
  id: number;
  sender: User;
  room: Room;
  content: string;
}
