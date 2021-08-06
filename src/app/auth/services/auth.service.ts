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
    return this.api
      .post(this.api.createUrl('login'), loginRequest)
      .pipe(tap((data) => this.doLoginUser(data)));
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
    return this.api
      .post(this.api.createUrl('signup'), user)
      .pipe(tap((data) => this.doLoginUser(data)));
  }

  logoutAndRedirect() {
    this.doLogoutUser();
    this.router.navigate(['/login']);
  }

  doLoginUser(data: any) {
    sessionStorage.setItem(this.TOKEN, data.token);
  }

  doLogoutUser(): void {
    this.socket.logout(this.getToken());
    sessionStorage.removeItem(this.TOKEN);
  }

  getCurrentUser(): User {
    const token = this.getToken();
    if (token) {
      const encodedPayload = token.split('.')[1];
      const payload = window.atob(encodedPayload);
      return JSON.parse(payload);
    } else {
      return undefined;
    }
  }

  getToken() {
    return sessionStorage.getItem(this.TOKEN);
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
