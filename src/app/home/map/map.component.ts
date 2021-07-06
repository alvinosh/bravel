import { Component, OnInit } from '@angular/core';

import { Location } from 'src/app/shared/models/DTOs/Location';

import { LocationService } from 'src/app/core/services/location.service';

import * as L from 'leaflet';
import { UsersService } from '../../core/services/users.service';
import { User } from 'src/app/shared/models/DTOs/User';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map;

  private loc: Location;

  constructor(
    private locationService: LocationService,
    private usersService: UsersService
  ) {}

  async ngOnInit() {
    let data = await this.locationService.getGeopostion();
    this.loc = { lat: data.coords.latitude, lon: data.coords.longitude };
    this.initMap(this.loc);
    this.initMarkers();
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

  private initMarkers(): void {
    var greenIcon = L.icon({
      iconUrl: 'assets/leaf-green.png',
      shadowUrl: 'assets/leaf-shadow.png',
      iconSize: [38, 95], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62], // the same for the shadow
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    this.usersService.getUsers().subscribe((data) => {
      data.map((user: User) => {
        L.marker([user.location.lat, user.location.lon], {
          icon: greenIcon,
        }).addTo(this.map);
      });
    });
  }
}
