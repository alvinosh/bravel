import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InputType } from 'src/app/shared/models/Input';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";

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
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: [{ name: string }, { name: string }, { name: string }] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    // event?['chipInput']!.clear();

  }

  remove(fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  constructor(private fb: FormBuilder) {}

  get f() {
    return this.createForm.controls;
  }

  create() {
    console.log(this.f);
  }
}
