import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenstorageService } from 'src/app/auth/services/tokenstorage.service';
import { RoomService } from 'src/app/core/services/room.service';
import { UsersService } from 'src/app/core/services/users.service';
import { RoomRequest } from 'src/app/shared/models/DTOs/Room';
import { InputType } from 'src/app/shared/models/Input';
import { Page } from 'src/app/shared/models/Page';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  @Output() pageEvent = new EventEmitter<Page>();

  type = InputType;

  createForm = this.fb.group({
    name: ['', Validators.required],
    users: [''],
    admins: [''],
  });

  userList: string[] = [];

  errors: string[] = [];

  get f() {
    return this.createForm.controls;
  }

  createRoom() {
    const roomRequest: RoomRequest = {
      name: this.f.name.value,
      users: this.f.users.value,
      admins: this.f.admins.value,
    };

    this.roomService.createRoom(roomRequest).subscribe(
      (data) => {},
      (error) => (this.errors = error.error.errors)
    );
    this.pageEvent.emit(Page.Back);
  }

  ngOnInit() {
    this.usersService.usersSubject.subscribe((data) => {
      if (data) {
        this.userList = data.map((user) => user.username);
        this.userList = this.userList.filter((user) => {
          return this.token.getUser().username !== user;
        });
      }
    });
  }

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private roomService: RoomService,
    private router: Router,
    private token: TokenstorageService
  ) {}
}
