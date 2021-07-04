import { Component } from '@angular/core';
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

  constructor(private socket: SocketioService) {}
}
