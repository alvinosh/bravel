import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from 'src/app/shared/models/DTOs/User';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiHttpService } from './api-http.service';
import { SocketioService } from './socketio.service';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  onlineUsers: User[] = [];

  usersSubject: BehaviorSubject<User[]>;

  constructor(
    private api: ApiHttpService,
    private auth: AuthService,
    private socket: SocketioService
  ) {
    this.usersSubject = new BehaviorSubject<User[]>(this.loadUsers());

    this.socket.userChange().subscribe((data) => {
      this.updateUser(data.username);
    });
  }

  getCurrentUser() {
    return this.auth.getCurrentUser();
  }

  getUsers(): BehaviorSubject<User[]> {
    return this.usersSubject;
  }

  updateUser(username: string) {
    this.api
      .get(this.api.createUrlWithPathVariables('user', [username]))
      .subscribe((data) => {
        let u = this.formatData(data.user);

        this.onlineUsers = this.onlineUsers.filter((data) => {
          return data.username !== u.username;
        });

        if (u.online) {
          if (this.getCurrentUser()) {
            if (u.username !== this.getCurrentUser().username) {
              this.onlineUsers.push(u);
            }
          } else {
            this.onlineUsers.push(u);
          }
        }

        this.usersSubject.next(this.onlineUsers);
      });
  }

  loadUsers(withCurrent: boolean = false): User[] {
    this.api.get(this.api.createUrl('users')).subscribe((data) => {
      this.onlineUsers = data.users
        .map((user) => {
          return this.formatData(user);
        })
        .filter((user) => {
          return (
            this.getCurrentUser().username !== user.username && !withCurrent
          );
        });
    });
    return this.onlineUsers;
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
