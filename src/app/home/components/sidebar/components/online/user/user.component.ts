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
    // TODO replace dumb distance calc with smart one
    // TODO that takes into account the curvature of the earth

    let lon1 = this.user.location.lon;
    let lat1 = this.user.location.lat;
    let lon2 = this.currentUser.location.lon;
    let lat2 = this.currentUser.location.lon;

    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = (R * c) / 1000;
    return d;
  }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
  }
}
