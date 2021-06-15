import { Component, OnInit } from '@angular/core';

import { faPlus, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  faPlus = faPlus;
  faCog = faCog;
  constructor() {}

  ngOnInit() {}
}
