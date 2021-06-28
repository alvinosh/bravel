import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InputType } from 'src/app/shared/models/Input';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  type = InputType;

  errors: string[];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  login() {
    const loginRequest = {
      username: this.f.username.value,
      password: this.f.password.value,
    };

    this.authService.login(loginRequest).subscribe(
      (data) => this.router.navigate(['/home']),
      (error) => (this.errors = error.error.message.split('\n'))
    );
  }
}
