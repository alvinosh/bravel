import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Message } from 'src/app/shared/models/DTOs/Message';
import { Room, RoomRequest } from 'src/app/shared/models/DTOs/Room';
import { User } from 'src/app/shared/models/DTOs/User';
import { ApiHttpService } from './api-http.service';
import { SocketioService } from './socketio.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  roomIndex = 0;

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
        return this.formatRoom(room);
      });

      this.roomSubject.next(rooms);
    });
  }

  formatMsg(msg: any): Message {
    return {
      content: msg.text,
      id: msg.id,
      room_id: msg.groupId,
      sender: this.formatUser(msg.sender),
    };
  }

  formatUser(user: any): User {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstname: user.first_name,
      lastname: user.last_name,
      online: user.online,
      location: {
        lat: user.location.lat,
        lon: user.location.lon,
      },
    };
  }

  formatRoom(room: any): Room {
    return {
      id: room.id,
      name: room.name,
      owner: this.formatUser(room.owner),
      users: room.users.map((user) => {
        return this.formatUser(user);
      }),
      admins: room.admins.map((user) => {
        return this.formatUser(user);
      }),
      messages: room.messages.map((msg) => {
        return this.formatMsg(msg);
      }),
    };
  }

  getRooms(): BehaviorSubject<Room[]> {
    if (this.roomSubject) return this.roomSubject;
  }

  updateRoom(room: Room) {
    return this.api.put(this.api.createUrl('room'), room);
  }

  deleteRoom(room: Room) {
    return this.api.delete(
      this.api.createUrlWithPathVariables('room', [room.id])
    );
  }
}
