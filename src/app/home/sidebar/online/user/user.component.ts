import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/models/DTOs/User';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  @Input() user: User;
  currentUser: User;

  faUserCircle = faUserCircle;

  constructor(private userService: UsersService) {
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  async getDistance() {
    if (!this.currentUser) return;

    let lon1 = this.user.location.lon;
    let lat1 = this.user.location.lat;
    let lon2 = this.currentUser.location.lon;
    let lat2 = this.currentUser.location.lat;

    // console.log('Current: ', lon1, lat1);
    // console.log('Other: ', lon2, lat2);

    let earthRadius = 6200;

    let latDelta = ((lat2 - lat1) * Math.PI) / 180;
    let lonDelta = ((lon2 - lon1) * Math.PI) / 180;

    let lat1Rad = (lat1 * Math.PI) / 180;
    let lat2Rad = (lat2 * Math.PI) / 180;

    let a =
      Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
      Math.sin(lonDelta / 2) *
        Math.sin(lonDelta / 2) *
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let distance = earthRadius * c;

    return distance;
  }
}
