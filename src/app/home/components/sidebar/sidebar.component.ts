import { Component, OnInit, Input } from '@angular/core';
import { SocketioService } from 'src/app/core/services/socketio.service';
import { Page } from 'src/app/shared/models/Page';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() page: Page = Page.Back; // decorate the property with @Input(

  Page = Page;

  isPage(x: Page): boolean {
    return x === this.page;
  }

  constructor() {}
}
