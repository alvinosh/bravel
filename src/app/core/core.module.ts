import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationService } from './services/location.service';
import { SocketioService } from './services/socketio.service';
import { UsersService } from './services/users.service';
import { ApiHttpService } from './services/api-http.service';
import { Constants } from './constants';
import { RoomService } from './services/room.service';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [],
  providers: [
    LocationService,
    SocketioService,
    UsersService,
    RoomService,
    MessageService,
    ApiHttpService,
    Constants,
  ],
  imports: [CommonModule],
})
export class CoreModule {}
