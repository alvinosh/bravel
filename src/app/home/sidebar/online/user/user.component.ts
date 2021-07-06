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
    let lon1 = this.user.location.lon;
    let lat1 = this.user.location.lat;
    let lon2 = this.currentUser.location.lon;
    let lat2 = this.currentUser.location.lon;

    return lon1 - lon2;
  }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
  }
}
