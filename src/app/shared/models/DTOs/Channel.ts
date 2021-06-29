import { User } from './User';

export interface Channel {
  name: string;
  members: User[];
}
