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
  constructor(private http: HttpClient, private auth: AuthService) {}

  getUsers(): Observable<User[]> {
    return this.http.get<any>(`${environment.apiurl}/users`).pipe(
      map((data) => {
        return data.users.map((user) => {
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
