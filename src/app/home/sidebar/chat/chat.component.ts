import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/models/DTOs/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];

  constructor() {}
  ngOnInit() {}
}
