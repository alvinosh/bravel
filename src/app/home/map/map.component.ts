import { Component, OnInit } from '@angular/core';

import { Location } from 'src/app/shared/models/DTOs/Location';

import { LocationService } from 'src/app/core/services/location.service';

import * as L from 'leaflet';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map;
  private markers;
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
    this.markers = new L.LayerGroup();

    this.map = L.map('map', {
      attributionControl: false,
      center: [loc.lat, loc.lon],
      zoom: 15,
      layers: [this.markers],
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
    let icon = L.icon({
      iconUrl: 'assets/user.png',
      iconSize: [30, 30], // size of the icon
      iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    });

    let c_icon = L.icon({
      iconUrl: 'assets/c_user.png',
      iconSize: [30, 30], // size of the icon
      iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    });

    this.usersService.getUsers().subscribe((data) => {
      this.markers.clearLayers();
      let map = this.map;
      if (data) {
        data.forEach((user) => {
          L.marker([user.location.lat, user.location.lon], {
            icon: this.usersService.isCurrentUser(user) ? c_icon : icon,
          })
            .addTo(this.markers)
            .on('click', (e) => {
              map.setView([user.location.lat, user.location.lon]);
            })
            .on('contextmenu', (e) => {
              L.popup()
                .setLatLng(e.latlng)
                .setContent(
                  `
									<pre>${user.username}</pre>
										
								`
                )
                .addTo(map)
                .openOn(map);
            });
        });
      }
    });
  }
}
