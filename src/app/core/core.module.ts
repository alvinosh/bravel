import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationService } from './services/location.service';
import { SocketioService } from './services/socketio.service';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [],
  providers: [LocationService, SocketioService, UsersService],
  imports: [CommonModule],
})
export class CoreModule {}
