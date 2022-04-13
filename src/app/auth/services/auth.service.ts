import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/DTOs/User';
import { Router } from '@angular/router';
import { Location } from 'src/app/shared/models/DTOs/Location';
import { SocketioService } from 'src/app/core/services/socketio.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN = 'TOKEN';

  constructor(
    private router: Router,
    private socket: SocketioService,
    private api: ApiHttpService
  ) {}

  login(loginRequest: {
    username: string;
    password: string;
  }): Observable<User> {
    return this.api.post(this.api.createUrl('login'), loginRequest);
  }

  signup(user: {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
    location: Location;
  }): Observable<User> {
    return this.api.post(this.api.createUrl('signup'), user);
  }

  refreshToken(token: string) {
    return this.api.post(this.api.createUrl('refreshtoken'), {
      refreshToken: token,
    });
  }
}
