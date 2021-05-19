import { Component, OnInit, AfterViewInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap(39.8282, -98.5795);
  }

  private initMap(x: number, y: number): void {
    this.map = L.map('map', {
      center: [x, y],
      zoom: 15,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 20,
        minZoom: 5,
      }
    );

    tiles.addTo(this.map);
  }
}
