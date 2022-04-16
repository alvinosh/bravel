import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { SocketioService } from 'src/app/core/services/socketio.service';

const TOKEN_KEY = 'auth-token';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenstorageService {
  constructor(
    private router: Router,
    private socket: SocketioService,
    private api: ApiHttpService
  ) {}

  signOut(): void {
    this.socket.logout(this.getToken());
    this.api.post(this.api.createUrl('user/offline'), {}).subscribe();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESHTOKEN_KEY);
    localStorage.setItem(REFRESHTOKEN_KEY, token);
  }
  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESHTOKEN_KEY);
  }
  public saveUser(token: any): void {
    localStorage.removeItem(USER_KEY);

    localStorage.setItem(USER_KEY, token);
  }
  public getUser(): any {
    const token = localStorage.getItem(USER_KEY);
    if (token) {
      const encodedPayload = token.split('.')[1];
      const payload = window.atob(encodedPayload);
      return JSON.parse(payload);
    } else {
      return undefined;
    }
  }
}
