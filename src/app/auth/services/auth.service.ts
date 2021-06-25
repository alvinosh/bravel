import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN = 'TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) {}

  login(user: { username: string; password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.apiurl}/login`, user).pipe(
      tap((data) => {
        this.saveToken(data);
        this.loggedUser = user.username;
      }),
      mapTo(true),
      catchError((error) => {
        alert(error.error);
        return of(false);
      })
    );
  }

  logout() {
    this.loggedUser = null;
    localStorage.removeItem(this.TOKEN);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.TOKEN);
  }

  private saveToken(data: any) {
    localStorage.setItem(this.TOKEN, data.token);
  }
}
