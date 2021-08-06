import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ChildActivationEnd } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { RoomService } from '../core/services/room.service';
import { SocketioService } from '../core/services/socketio.service';
import { Page } from '../shared/models/Page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentPage: Page = Page.Back;

  Page = Page;

  setPage(x: Page) {
    this.currentPage = x;
  }

  constructor(
    private socket: SocketioService,
    private auth: AuthService,
    private roomService: RoomService,
    private router: Router
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (ev.url === '/home') {
          this.socket.join(this.auth.getToken());
        }
      }
    });
  }
}
