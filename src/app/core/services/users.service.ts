import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from 'src/app/shared/models/DTOs/User';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiHttpService } from './api-http.service';
import { SocketioService } from './socketio.service';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersSubject: BehaviorSubject<User[]>;

  constructor(
    private api: ApiHttpService,
    private auth: AuthService,
    private socket: SocketioService
  ) {
    this.usersSubject = new BehaviorSubject<User[]>(null);
    this.loadUsers();

    this.socket.userChange().subscribe((data) => {
      this.loadUsers();
    });
  }

  getCurrentUser() {
    return this.auth.getCurrentUser();
  }

  isCurrentUser(other: User): boolean {
    return this.getCurrentUser().username === other.username;
  }

  getUsers(): BehaviorSubject<User[]> {
    if (this.usersSubject) return this.usersSubject;
  }

  loadUsers(withCurrent: boolean = false) {
    this.api.get(this.api.createUrl('users')).subscribe((data) => {
      let onlineUsers: User[] = data.users.map((user) => {
        return this.formatData(user);
      });

      this.usersSubject.next(onlineUsers);
    });
  }

  formatData(data: any): User {
    return {
      email: data.email,
      username: data.username,
      firstname: data.first_name,
      lastname: data.last_name,
      online: data.online,
      location: {
        lat: data.location.lat,
        lon: data.location.lon,
      },
    };
  }
}
