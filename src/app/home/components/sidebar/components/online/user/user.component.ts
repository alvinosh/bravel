import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/shared/models/Color';
import { User } from 'src/app/shared/models/User';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { NumericValueAccessor } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  faUserCircle = faUserCircle;

  user: User = {
    id: 1,
    username: 'lol',
    location: {
      lat: 4,
      lon: 5,
    },
    color: Color.Black,
  };

  distance: number;

  constructor() {
    this.distance = 5;
  }

  ngOnInit() {}
}
