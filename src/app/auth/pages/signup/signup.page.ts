import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/core/services/location.service';
import { Location } from 'src/app/shared/models/DTOs/Location';

import { InputType } from 'src/app/shared/models/Input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  signupForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmpassword: ['', Validators.required],
  });

  errors: string[];

  type = InputType;

  loc: Location;

  get f() {
    return this.signupForm.controls;
  }

  constructor(
    private locationService: LocationService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    let data = this.locationService.getGeopostion().then((data) => {
      this.loc = { lat: data.coords.latitude, lon: data.coords.longitude };
    });
  }

  signup() {
    const signupRequest = {
      firstname: this.f.firstname.value,
      lastname: this.f.lastname.value,
      username: this.f.username.value,
      email: this.f.email.value,
      password: this.f.password.value,
      confirmpassword: this.f.confirmpassword.value,
      location: this.loc,
    };

    this.authService.signup(signupRequest).subscribe(
      (data) => this.router.navigate(['/home']),
      (error) => (this.errors = error.error.errors)
    );
  }
}
