import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from 'src/app/shared/models/Location';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map;

  constructor(private geolocation: Geolocation) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getCoords().then((res: Location) => {
      if (res) {
        this.initMap(res.lat, res.lon);
      }
    });
  }

  private async getCoords(): Promise<Location> {
    let res;
    try {
      res = await this.geolocation.getCurrentPosition();
    } catch (error) {
      console.log(error);
    }
    return { lat: res.coords.latitude, lon: res.coords.longitude };
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
