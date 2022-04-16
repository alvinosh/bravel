import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenstorageService } from 'src/app/auth/services/tokenstorage.service';
import { SocketioService } from 'src/app/core/services/socketio.service';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/DTOs/User';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss'],
})
export class OnlineComponent implements OnInit {
  @Output() userPanEvent = new EventEmitter<User>();

  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private token: TokenstorageService
  ) {}

  getUser(): User {
    console.log(this.token.getUser());

    return this.token.getUser();
  }

  panEvent(user: User) {
    this.userPanEvent.emit(user);
  }

  ngOnInit() {
    this.usersService.usersSubject.subscribe((data) => {
      if (data) this.users = data;
    });
  }
}
