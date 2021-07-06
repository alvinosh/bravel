import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/models/DTOs/User';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() user: User;
  @Input() currentUser: User;

  faUserCircle = faUserCircle;

  distance: number = 1;

  constructor() {}

  getDistance() {
    let x1 = this.user.location.lon;
    let y1 = this.user.location.lat;
    let x2 = this.currentUser.location.lon;
    let y2 = this.currentUser.location.lon;

    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }
}
