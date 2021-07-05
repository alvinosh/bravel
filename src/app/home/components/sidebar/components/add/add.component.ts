import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InputType } from 'src/app/shared/models/Input';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  createForm = this.fb.group({
    name: ['', Validators.required],
  });

  type = InputType;

  errors: string[];

  constructor(private fb: FormBuilder) {}

  get f() {
    return this.createForm.controls;
  }

  create() {
    console.log(this.f);
  }
}
