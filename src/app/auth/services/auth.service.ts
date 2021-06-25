import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN = 'JWT_TOKEN';

  constructor(private http: HttpClient) {}

  login(user: { username: string; password: string }): void {
    this.http.post<any>(`${environment.apiurl}/login`, user).pipe(
      tap((tokens) => {
        console.log(tokens);
      }),
      mapTo(true),
      catchError((error) => {
        alert(error.error);
        return of(false);
      })
    );
  }

  isLoggedIn(): boolean {
    return false;
  }

  getJwtToken() {
    return localStorage.getItem(this.TOKEN);
  }
}
