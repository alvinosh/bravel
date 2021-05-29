import { Color } from './Color';
import { Location } from './Location';

export interface User {
  id: number;
  username: string;
  location: Location;
  color: Color;
}
