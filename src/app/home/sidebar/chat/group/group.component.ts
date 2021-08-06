import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons';
import { RoomService } from 'src/app/core/services/room.service';
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

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.roomService.getRooms().subscribe((data) => {
      if (data) {
        this.roomList = data;
        this.selroom = this.roomList[0];
        this.roomEvent.emit(this.selroom);
      }
    });
  }
}
