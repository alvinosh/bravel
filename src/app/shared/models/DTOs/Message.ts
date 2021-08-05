import { Room } from './Room';
import { User } from './User';

export interface Message {
  sender: User;
  room: Room;
  content: string;
}
