import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InputType } from 'src/app/shared/models/Input';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = this.fb.group({
    username: [''],
    password: [''],
  });

  type = InputType;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login({
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
    });
  }
}
