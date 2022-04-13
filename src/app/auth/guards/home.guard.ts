import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { TokenstorageService } from '../services/tokenstorage.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate, CanLoad {
  constructor(private token: TokenstorageService, private router: Router) {}

  canActivate(): boolean {
    return this.canLoad();
  }

  canLoad(): boolean {
    if (!this.token.getToken()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
