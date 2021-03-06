import { Injectable } from '@angular/core';

import { User } from 'src/app/shared/models/DTOs/User';

import { BehaviorSubject } from 'rxjs';
import { ApiHttpService } from './api-http.service';
import { SocketioService } from './socketio.service';
import { Location } from 'src/app/shared/models/DTOs/Location';
import { Room } from 'src/app/shared/models/DTOs/Room';
import { TokenstorageService } from 'src/app/auth/services/tokenstorage.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersSubject: BehaviorSubject<User[]>;
  currentUserSubject: BehaviorSubject<User>;

  constructor(
    private api: ApiHttpService,
    private token: TokenstorageService,
    private socket: SocketioService
  ) {
    this.usersSubject = new BehaviorSubject<User[]>(null);
    this.currentUserSubject = new BehaviorSubject<User>(null);

    this.loadUsers();

    this.socket.userChange().subscribe((data) => {
      this.loadUsers();
    });
  }

  isCurrentUser(other: User): boolean {
    return this.token.getUser().username === other.username;
  }

  getUsers(): BehaviorSubject<User[]> {
    if (this.usersSubject) return this.usersSubject;
  }

  getCurrentUser(): BehaviorSubject<User> {
    if (this.currentUserSubject) return this.currentUserSubject;
  }

  loadUsers() {
    let a = this.api.get(this.api.createUrl('users')).subscribe((data) => {
      let onlineUsers: User[] = data.users.map((user) => {
        if (this.isCurrentUser(user)) this.currentUserSubject.next(user);
        return this.formatData(user);
      });

      this.usersSubject.next(onlineUsers);
    });
  }

  formatData(data: any): User {
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      firstname: data.first_name,
      lastname: data.last_name,
      online: data.online,
      location: {
        lat: data.location.lat,
        lon: data.location.lon,
      },
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }

  updateLocation(loc: Location) {
    return this.api.put(this.api.createUrl('user/location'), loc);
  }

  leaveRoom(room: Room) {
    return this.api.put(this.api.createUrl('user/room'), room);
  }
}
