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
import { TokenstorageService } from '../../services/tokenstorage.service';
import { passwordMatchingValidatior } from '../../validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  signupForm = new FormGroup(
    {
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
      confirmpassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchingValidatior }
  );

  errors: string[];

  type = InputType;

  loc: Location;

  get firstname() {
    return this.signupForm.get('firstname');
  }

  get lastname() {
    return this.signupForm.get('lastname');
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }
  get confirmpassword() {
    return this.signupForm.get('confirmpassword');
  }

  constructor(
    private locationService: LocationService,
    private token: TokenstorageService,
    private authService: AuthService,
    private router: Router
  ) {
    let data = this.locationService.getGeopostion().then((data) => {
      this.loc = { lat: data.coords.latitude, lon: data.coords.longitude };
    });
  }

  isEmpty(s: string): boolean {
    return this.signupForm.controls[s].errors?.required;
  }

  signup() {
    const signupRequest = {
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      confirmpassword: this.confirmpassword.value,
      location: this.loc,
    };

    this.authService.signup(signupRequest).subscribe(
      (data) => {
        this.token.saveToken(data.accessToken);
        this.token.saveRefreshToken(data.refreshToken);
        this.token.saveUser(data.accessToken);

        this.router.navigate(['/home']);
      },
      (error) => (this.errors = error.error.errors)
    );
  }

  redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
