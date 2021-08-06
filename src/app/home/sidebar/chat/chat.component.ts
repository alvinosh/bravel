import { Component } from '@angular/core';
import { MessageService } from 'src/app/core/services/message.service';
import { RoomService } from 'src/app/core/services/room.service';
import { Message, MessageRequest } from 'src/app/shared/models/DTOs/Message';
import { Room } from 'src/app/shared/models/DTOs/Room';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  currentRoom: Room;
  constructor(private messageService: MessageService) {}

  sendMsg(msg: string) {
    let m: MessageRequest = {
      message: msg,
      room_id: this.currentRoom.id,
    };

    this.messageService.createMessage(m).subscribe(
      (data) => {},
      (error) => console.log(error)
    );
  }

  changeRoom(room: Room) {
    this.currentRoom = room;
  }
}
