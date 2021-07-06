import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from 'src/app/shared/models/DTOs/User';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  currentUser: User;

  onlineUsers: User[];

  constructor(private api: ApiHttpService, private auth: AuthService) {
    this.auth.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
  }

  getCurrentUser(): User {
    return this.currentUser;
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

  getUsers(withCurrent: boolean = false): Observable<User[]> {
    return this.api.get(this.api.createUrl('users')).pipe(
      map((data) => {
        return data.users
          .map((user) => {
            return this.formatData(user);
          })
          .filter((user) => {
            return this.currentUser.username !== user.username && !withCurrent;
          });
      })
    );
  }
}
