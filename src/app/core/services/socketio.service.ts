import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ApiHttpService } from './api-http.service';
@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  constructor(private socket: Socket, private api: ApiHttpService) {}

  join(username: string) {
    this.socket.emit('join', username);
    this.api.post(this.api.createUrl('user/online'), {}).subscribe();
  }

  logout(token: string) {
    this.socket.emit('logout', token);
  }

  userChange(): Observable<any> {
    return this.socket.fromEvent('user-change');
  }

  roomChange(): Observable<any> {
    return this.socket.fromEvent('room-change');
  }
}
