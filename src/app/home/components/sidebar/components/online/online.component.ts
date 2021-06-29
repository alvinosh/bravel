import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/models/DTOs/User';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss'],
})
export class OnlineComponent implements OnInit {
  users: User[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getCurrentUser().subscribe((data) => {
      console.log(data);
    });
  }
}
