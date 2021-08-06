import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Room } from 'src/app/shared/models/DTOs/Room';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})
export class MessageFormComponent {
  faPaperPlane = faPaperPlane;

  @Output() messageEvent = new EventEmitter<string>();
  @Input() currentRoom: Room;

  msg: string = '';

  constructor() {}

  newMessage() {
    if (this.msg) {
      this.messageEvent.emit(this.msg);
      this.msg = '';
    }
  }
}
