import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user: User;

  faUserCircle = faUserCircle;

  distance: number;

  constructor() {
    this.distance = 5;
  }

  ngOnInit() {}
}
