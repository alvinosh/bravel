import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SocketioService } from 'src/app/core/services/socketio.service';
import { Page } from 'src/app/shared/models/Page';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() page: Page = Page.Back;
  @Output() pageChange = new EventEmitter<Page>();

  Page = Page;

  isPage(x: Page): boolean {
    return x === this.page;
  }

  changePage(page: Page) {
    this.pageChange.emit(page);
  }

  constructor() {}

  ngOnInit() {}
}
