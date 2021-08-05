import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Room, RoomRequest } from 'src/app/shared/models/DTOs/Room';
import { ApiHttpService } from './api-http.service';
import { SocketioService } from './socketio.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  roomSubject: BehaviorSubject<Room[]>;

  constructor(private api: ApiHttpService, private socket: SocketioService) {
    this.roomSubject = new BehaviorSubject<Room[]>(null);
    this.loadRooms();

    this.socket.roomChange().subscribe((data) => {
      this.loadRooms();
    });
  }

  createRoom(room: RoomRequest): Observable<RoomRequest> {
    return this.api.post(this.api.createUrl('room'), room);
  }

  loadRooms() {
    this.api.get(this.api.createUrl('rooms')).subscribe((data) => {
      let rooms: Room[] = data.rooms.map((room) => {
        return room;
      });

      this.roomSubject.next(rooms);
    });
  }

  getRooms(): BehaviorSubject<Room[]> {
    if (this.roomSubject) return this.roomSubject;
  }
}
