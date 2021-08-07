import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/shared/models/DTOs/Room';

import { faUsersCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/DTOs/User';

@Component({
  selector: 'room-settings',
  templateUrl: './room-settings.component.html',
  styleUrls: ['./room-settings.component.scss'],
})
export class RoomSettingsComponent implements OnInit {
  faUsersCog = faUsersCog;
  faTimes = faTimes;

  @Input() currentRoom: Room;

  avaUsers: User[];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    setInterval(() => {
      console.log(this.currentRoom);
    }, 5000);
    this.usersService.usersSubject.subscribe((data) => {
      if (data) {
        this.avaUsers = data.filter((user) => {
          for (let i = 0; i < this.currentRoom.users.length; i++) {
            const u = this.currentRoom.users[i];
            if ((u.username = user.username)) return false;
          }
          return true;
        });
      }
    });
  }

  isOwner(user: User) {
    return user.username === this.currentRoom.owner.username;
  }

  isAdmin(user: User) {
    for (let i = 0; i < this.currentRoom.admins.length; i++) {
      if (user.username === this.currentRoom.admins[i].username) {
        return true;
      }
    }
    return false;
  }
}
