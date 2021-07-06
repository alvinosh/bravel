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

  currentUser: User;

  constructor(
    private usersService: UsersService,
    private socket: SocketioService
  ) {
    this.socket.userChange().subscribe((data) => {
      this.getUsers();
    });
  }

  ngOnInit() {
    this.currentUser = this.usersService.getCurrentUser();
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
      this.users = this.users.filter((user) => {
        return this.currentUser.username !== user.username;
      });
    });
  }
}
