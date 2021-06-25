import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: { username: string; password: string }): Observable<boolean> {
    return this.http.post<any>(`${API_URL}/login`, user).pipe(
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
}
