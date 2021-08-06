import { Component, OnInit } from '@angular/core';

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

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.roomService.getRooms().subscribe((data) => {
      if (data) {
        this.roomList = data;
      }
    });
  }
}
