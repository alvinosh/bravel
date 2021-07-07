import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/DTOs/User';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  getUser(): User {
    return this.usersService.getCurrentUser();
  }

  logout() {
    this.authService.logoutAndRedirect();
  }
}
