import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/DTOs/User';
import { InputType } from 'src/app/shared/models/Input';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  type = InputType;

  createForm = this.fb.group({
    name: ['', Validators.required],
    users: ['', Validators.required],
    admins: ['', Validators.required],
  });

  userList: string[];

  get f() {
    return this.createForm.controls;
  }

  ngOnInit() {
    this.usersService.usersSubject.subscribe((data) => {
      this.userList = data.map((user) => user.username);
    });
  }

  constructor(private fb: FormBuilder, private usersService: UsersService) {}
}
