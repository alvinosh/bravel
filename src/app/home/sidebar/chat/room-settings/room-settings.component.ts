import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Room } from 'src/app/shared/models/DTOs/Room';

import { faUsersCog, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/shared/models/DTOs/User';
import { RoomService } from 'src/app/core/services/room.service';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'room-settings',
  templateUrl: './room-settings.component.html',
  styleUrls: ['./room-settings.component.scss'],
})
export class RoomSettingsComponent implements OnInit {
  faUsersCog = faUsersCog;
  faTimes = faTimes;

  @Input() currentRoom: Room;
  @Output() closeSettingsEvent = new EventEmitter<boolean>();

  virtualRoom: Room;

  avaUsers: User[];

  addUsers: User[] = [];

  constructor(
    private usersService: UsersService,
    private roomsService: RoomService
  ) {}

  ngOnInit() {
    this.virtualRoom = JSON.parse(JSON.stringify(this.currentRoom));
    this.usersService.usersSubject.subscribe((data) => {
      if (data) {
        this.avaUsers = data.filter((user) => {
          for (let i = 0; i < this.virtualRoom.users.length; i++) {
            const u = this.virtualRoom.users[i];
            if (u.username === user.username) return false;
          }
          return true;
        });
      }
    });
  }

  isOwner(user: User) {
    return user.username === this.virtualRoom.owner.username;
  }

  isAdmin(user: User) {
    for (let i = 0; i < this.virtualRoom.admins.length; i++) {
      if (user.username === this.virtualRoom.admins[i].username) {
        return true;
      }
    }
    return false;
  }

  makeAdmin(user: User) {
    this.virtualRoom.admins = [...this.virtualRoom.admins, user];
  }

  kick(user: User) {
    this.virtualRoom.users = this.virtualRoom.users.filter((u) => {
      return u.username !== user.username;
    });

    console.log(this.virtualRoom);
  }

  confirmChanges() {
    let output = JSON.parse(JSON.stringify(this.virtualRoom));

    output.users = output.users.concat(this.addUsers);
    this.roomsService.updateRoom(output).subscribe(
      (data) => {
        this.closeSettingsEvent.emit(true);
      },
      (error) => console.log(error)
    );
  }

  discardChanges() {
    this.virtualRoom = JSON.parse(JSON.stringify(this.currentRoom));
  }

  deleteRoom() {}
}
