import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/shared/models/Color';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss'],
})
export class OnlineComponent implements OnInit {
  users: User[] = [];

  constructor() {
    for (let i = 0; i < 15; i++) {
      let user: User = {
        id: 5,
        username: 'testest',
        location: {
          lon: 5,
          lat: 5,
        },
        email: 'a',
        firstname: 'a',
        lastname: 'a',
      };

      this.users.push(user);
    }
  }

  ngOnInit() {}
}
