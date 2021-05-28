import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/models/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  msg: Message = {
    author: 'bakely',
    content: 'what ya doing there mf',
  };

  constructor() {}

  ngOnInit() {}
}
