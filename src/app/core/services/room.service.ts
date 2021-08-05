import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RoomRequest } from 'src/app/shared/models/DTOs/Room';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private api: ApiHttpService, private auth: AuthService) {}

  createRoom(room: RoomRequest): Observable<RoomRequest> {
    return this.api.post(this.api.createUrl('room'), room);
  }
}
