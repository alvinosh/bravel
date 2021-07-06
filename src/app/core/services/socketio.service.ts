import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from 'src/app/auth/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  constructor(private socket: Socket) {}

  join(token: string) {
    this.socket.emit('join', token);
  }

  logout(token: string) {
    this.socket.emit('logout', token);
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
}
