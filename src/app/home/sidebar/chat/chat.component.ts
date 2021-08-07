import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('scroller') private scroller: ElementRef;

  currentRoom: Room;
  settings: boolean = false;
  constructor(private messageService: MessageService) {}

  toggleSettings() {
    this.settings = !this.settings;
  }

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

  changeRoom(room: Room | null) {
    this.settings = false;
    this.currentRoom = room;
    if (!this.settings && this.currentRoom) {
      setTimeout(() => {
        this.scroller.nativeElement.scrollTop =
          this.scroller.nativeElement.scrollTopMax;
      }, 0);
    }
  }
}
