import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  userChange(): Observable<any> {
    return this.socket.fromEvent('user-change');
  }
}
