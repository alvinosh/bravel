import { Component } from '@angular/core';
import { Page } from '../shared/models/Page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentPage: Page;

  setPage(x: Page) {
    this.currentPage = x;
  }

  constructor() {}
}
