import { Component, OnInit } from '@angular/core';
import { SocketioService } from 'src/app/core/services/socketio.service';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/DTOs/User';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss'],
})
export class OnlineComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService: UsersService) {
    this.usersService.usersSubject.subscribe((data) => {
      this.users = data;
    });
  }

  getUser(): User {
    return this.usersService.getCurrentUser();
  }

  ngOnInit() {}
}
