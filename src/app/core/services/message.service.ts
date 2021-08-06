import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageRequest } from 'src/app/shared/models/DTOs/Message';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private api: ApiHttpService) {}

  createMessage(message: MessageRequest): Observable<MessageRequest> {
    return this.api.post(this.api.createUrl('message'), message);
  }
}
