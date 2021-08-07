import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { faPlus, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { RoomService } from 'src/app/core/services/room.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Room } from 'src/app/shared/models/DTOs/Room';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  private readonly ROOM = 'ROOM';

  faPlus = faPlus;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;

  roomList: Room[] = [];
  selroom: Room;

  @Output() roomEvent = new EventEmitter<Room | undefined>();

  constructor(
    private roomService: RoomService,
    private usersService: UsersService
  ) {}

  roomChange() {
    sessionStorage.setItem(this.ROOM, this.selroom.id.toString());
    this.roomEvent.emit(this.selroom);
  }

  isAdmin() {
    for (let i = 0; i < this.selroom.admins.length; i++) {
      if (this.usersService.isCurrentUser(this.selroom.admins[i])) {
        return true;
      }
    }
    return false;
  }

  leaveRoom() {
    this.usersService.leaveRoom(this.selroom).subscribe(
      (data) => {},
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.roomService.loadRooms();

    this.roomService.getRooms().subscribe((data) => {
      if (data) {
        this.roomList = data;

        if (!this.selroom) {
          let selroom_id: number = parseInt(sessionStorage.getItem(this.ROOM));
          if (selroom_id) {
            this.roomList.forEach((room) => {
              if (room.id === selroom_id) {
                this.selroom = room;
              }
            });
          }
          if (!this.selroom) this.selroom = this.roomList[0];
        } else {
          this.roomList.forEach((room) => {
            if (this.selroom.id === room.id) {
              this.selroom = room;
            }
          });
        }
        if (this.roomList.length <= 0) {
          this.selroom = null;
        }

        this.roomEvent.emit(this.selroom);
      }
    });
  }
}
