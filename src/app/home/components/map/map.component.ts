import { Component, OnInit } from '@angular/core';

import { Location } from 'src/app/shared/models/DTOs/Location';

import { LocationService } from 'src/app/home/services/location.service';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map;

  private loc: Location;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.locationService.getGeopostion().subscribe((data) => {
      this.loc = { lat: data.coords.latitude, lon: data.coords.longitude };
      this.initMap(this.loc);
    });
  }

  private initMap(loc: Location): void {
    this.map = L.map('map', {
      attributionControl: false,
      center: [loc.lat, loc.lon],
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
