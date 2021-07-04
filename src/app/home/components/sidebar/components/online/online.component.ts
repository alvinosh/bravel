import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/DTOs/User';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss'],
})
export class OnlineComponent implements OnInit {
  currentUser: User;

  users: User[] = [];

  constructor(private auth: AuthService, private usersService: UsersService) {}

  ngOnInit() {
    this.auth.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });

    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
