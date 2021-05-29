import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/models/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      let msg: Message = {
        author: 'bakely',
        content: 'what ya doing there mf',
        senderId: 4,
      };

      this.messages.push(msg);
    }
  }
  ngOnInit() {}
}
