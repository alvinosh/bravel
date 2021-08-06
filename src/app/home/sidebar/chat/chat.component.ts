import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Message } from 'src/app/shared/models/DTOs/Message';
import { Room } from 'src/app/shared/models/DTOs/Room';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  messages: Message[] = [];
  currentRoom: Room;

  constructor(private userSerivce: UsersService) {}

  sendMsg(msg: string) {
    let m: Message = {
      content: msg,
      sender: this.userSerivce.getCurrentUser(),
      room: this.currentRoom,
    };
    this.messages.push(m);
  }

  changeRoom(room: Room) {
    this.currentRoom = room;
  }
}
