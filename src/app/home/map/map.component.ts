import { Component, OnDestroy, OnInit } from '@angular/core';

import { Location } from 'src/app/shared/models/DTOs/Location';

import { LocationService } from 'src/app/core/services/location.service';

import * as L from 'leaflet';
import { UsersService } from '../../core/services/users.service';
import { User } from 'src/app/shared/models/DTOs/User';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  private map;
  private markers;
  private loc: Location;

  private panZoom = 15;

  private updateTime = 10000;
  private locInterval;

  constructor(
    private locationService: LocationService,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.loc = await this.getLocation();
    this.initMap(this.loc);
    this.initMarkers();

    this.usersService.updateLocation(await this.getLocation()).subscribe(
      (data) => {},
      (error) => console.log(error)
    );
    this.locInterval = setInterval(async () => {
      let loc = await this.getLocation();
      this.usersService
        .updateLocation(loc)
        .subscribe((error) => console.log(error));
    }, this.updateTime);
  }

  ngOnDestroy() {
    clearInterval(this.locInterval);
  }

  private async getLocation(): Promise<Location> {
    let data = await this.locationService.getGeopostion();
    return {
      lat: data.coords.latitude,
      lon: data.coords.longitude,
    };
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
              map.setView([user.location.lat, user.location.lon], this.panZoom);
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

  public moveTo(user: User) {
    this.map.setView([user.location.lat, user.location.lon], this.panZoom);
  }
}
