import { Component, OnInit } from '@angular/core';
import {
  faShare,
  faAddressBook,
  faCommentAlt,
  faCog,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faShare = faShare;
  faAddressBook = faAddressBook;
  faCommentAlt = faCommentAlt;
  faCog = faCog;
  faPlus = faPlus;

  active: number = 1;

  setActive(x: number) {
    this.active = x;
  }

  constructor() {}

  ngOnInit() {}
}
