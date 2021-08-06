import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons';
import { RoomService } from 'src/app/core/services/room.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Room } from 'src/app/shared/models/DTOs/Room';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  faPlus = faPlus;
  faCog = faCog;

  roomList: Room[] = [];
  selroom: Room;

  @Output() roomEvent = new EventEmitter<Room>();

  roomChange() {
    this.roomEvent.emit(this.selroom);
  }

  constructor(
    private roomService: RoomService,
    private usersService: UsersService
  ) {}

  isAdmin() {
    for (let i = 0; i < this.selroom.admins.length; i++) {
      if (this.usersService.isCurrentUser(this.selroom.admins[i])) {
        return true;
      }
    }
    return false;
  }

  ngOnInit() {
    this.roomService.getRooms().subscribe((data) => {
      if (data) {
        this.roomList = data;
        if (!this.selroom) {
          this.selroom = this.roomList[0];
        } else {
          this.roomList.forEach((room) => {
            if (this.selroom.id === room.id) {
              this.selroom = room;
            }
          });
        }

        this.roomEvent.emit(this.selroom);
      }
    });
  }
}
