import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Location } from 'src/app/shared/models/Location';

import { LocationService } from 'src/app/core/services/location/location.service';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map;

  constructor(private locationService: LocationService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.locationService.getCoords().then((res: Location) => {
      if (res) {
        this.initMap(res.lat, res.lon);
      }
    });
  }

  private initMap(x: number, y: number): void {
    this.map = L.map('map', {
      attributionControl: false,
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
