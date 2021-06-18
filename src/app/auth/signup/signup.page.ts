import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { InputType } from 'src/app/shared/models/Input';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    email: [''],
    password: [''],
    confirmpassword: [''],
  });

  type = InputType;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.signupForm.value);
  }
}
