import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { TokenstorageService } from '../services/tokenstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private token: TokenstorageService, private router: Router) {}

  canActivate(): boolean {
    if (this.token.getToken()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
