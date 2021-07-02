import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from 'src/app/shared/models/DTOs/User';
import { environment } from 'src/environments/environment';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // TODO : Find way to cache users

  constructor(private http: HttpClient, private auth: AuthService) {}

  getUsers(): Observable<User[]> {
    let currentUser: User;

    this.auth.getCurrentUser().subscribe((data) => {
      currentUser = data;
    });
    return this.http.get<any>(`${environment.apiurl}/users`).pipe(
      map((data) => {
        let users = data.users!.filter((user) => {
          return user.username !== currentUser.username;
        });

        return users.map((user) => {
          return {
            email: user.email,
            username: user.username,
            firstname: user.first_name,
            lastname: user.last_name,
            online: user.online,
            location: {
              lat: user.location.lat,
              lon: user.location.lon,
            },
          };
        });
      })
    );
  }
}
