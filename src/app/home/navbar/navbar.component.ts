import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import {
  faShare,
  faAddressBook,
  faCommentAlt,
  faCog,
  faPlus,
  faGlobeAmericas,
} from '@fortawesome/free-solid-svg-icons';

import { Page } from 'src/app/shared/models/Page';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() pageChange = new EventEmitter<Page>();

  faShare = faShare;
  faAddressBook = faAddressBook;
  faCommentAlt = faCommentAlt;
  faCog = faCog;
  faPlus = faPlus;
  faGlobeAmericas = faGlobeAmericas;

  Page = Page;

  active: Page = Page.Back;

  setActive(x: Page) {
    this.active = x;
    this.pageChange.emit(this.active);
  }

  isActive(x: Page): boolean {
    return this.active === x;
  }

  constructor() {}

  ngOnInit() {}
}
