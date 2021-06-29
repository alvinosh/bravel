import { Channel } from './Channel';
import { User } from './User';

export interface Message {
  sender: User;
  channel: Channel;
  content: string;
}
