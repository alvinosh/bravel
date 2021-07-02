import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/DTOs/User';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user: User;

  faUserCircle = faUserCircle;

  distance: number = 1;

  currentUser: User;

  constructor(private auth: AuthService) {}

  getDistance() {
    const deg2rad = (deg: number) => {
      return deg * (Math.PI / 180);
    };

    const R = 6371;
    const dLat = deg2rad(
      this.currentUser.location.lat - this.user.location.lat
    );
    const dLon = deg2rad(
      this.currentUser.location.lon - this.user.location.lon
    );
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(this.currentUser.location.lat)) *
        Math.cos(deg2rad(this.currentUser.location.lon)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
  }
}
