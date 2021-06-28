import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/User';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN = 'TOKEN';

  constructor(private http: HttpClient, private router: Router) {}

  login(loginRequest: {
    username: string;
    password: string;
  }): Observable<User> {
    return this.http
      .post<any>(`${environment.apiurl}/login`, loginRequest)
      .pipe(tap((data) => this.doLoginUser(data)));
  }

  signup(user: {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
  }): Observable<User> {
    return this.http
      .post<any>(`${environment.apiurl}/signup`, user)
      .pipe(tap((data) => this.doLoginUser(data)));
  }

  logout() {
    localStorage.removeItem(this.TOKEN);
  }

  logoutAndRedirect() {
    this.logout();
    this.router.navigate(['/login']);
  }

  doLoginUser(data: any) {
    localStorage.setItem(this.TOKEN, data.token);
  }

  doLogoutUser(): void {
    localStorage.removeItem(this.TOKEN);
  }

  getCurrentUser(): Observable<User> {
    const token = this.getToken();
    if (token) {
      const encodedPayload = token.split('.')[1];
      const payload = window.atob(encodedPayload);
      return of(JSON.parse(payload));
    } else {
      return of(undefined);
    }
  }

  getToken() {
    return localStorage.getItem(this.TOKEN);
  }

  isLoggedIn(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map((user) => !!user),
      catchError(() => of(false))
    );
  }
}
