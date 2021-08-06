import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ChildActivationEnd } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { RoomService } from '../core/services/room.service';
import { SocketioService } from '../core/services/socketio.service';
import { User } from '../shared/models/DTOs/User';
import { Page } from '../shared/models/Page';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(MapComponent) map: MapComponent;

  currentPage: Page = Page.Back;

  Page = Page;

  setPage(x: Page) {
    this.currentPage = x;

    if (x === Page.Back) {
      this.map.moveTo(this.auth.getCurrentUser());
    }
  }

  userPan(user: User) {
    this.map.moveTo(user);
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
