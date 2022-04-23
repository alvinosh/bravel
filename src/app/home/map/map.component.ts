import { Component, OnDestroy, OnInit } from '@angular/core';

import { Location } from 'src/app/shared/models/DTOs/Location';

import { LocationService } from 'src/app/core/services/location.service';

import * as L from 'leaflet';
import {FeatureGroup, LatLngBounds, Marker, Polyline, tileLayer} from 'leaflet';
import { UsersService } from '../../core/services/users.service';
import { User } from 'src/app/shared/models/DTOs/User';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MapService } from 'src/app/core/services/map.service';
import { TokenstorageService } from 'src/app/auth/services/tokenstorage.service';
const polyUtil = require('polyline-encoded');

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  private map;
  private markers;
  private loc: Location;

  private user: User;

  private tilelayer;

  private panZoom = 15;

  private updateTime = 5000;
  private locInterval;
  private polyline: any;

  constructor(
    private locationService: LocationService,
    private usersService: UsersService,
    private tokenstorageService: TokenstorageService,
    private mapService: MapService
  ) {}

  async ngOnInit() {
    await this.initAll();

    this.usersService.getCurrentUser().subscribe((data) => {
      this.user = data;
      this.initMarkers();
    });

    this.mapService.getSubject().subscribe((map) => {
      this.map.removeLayer(this.tilelayer);
      this.tilelayer = L.tileLayer(this.mapService.getMap().link, {
        maxZoom: 20,
        minZoom: 5,
      }).addTo(this.map);
    });
  }

  ngOnDestroy() {
    clearInterval(this.locInterval);
  }

  private async initAll() {
    this.loc = await this.getLocation();
    this.initMap(this.loc);

    this.usersService.updateLocation(await this.getLocation()).subscribe(
      (data) => {},
      (error) => console.log(error)
    );

    this.locInterval = setInterval(async () => {
      this.polyline && this.map.removeLayer(this.polyline);
      let loc = await this.getLocation();
      this.usersService.updateLocation(loc).subscribe(
        (data) => {},
        (error) => console.log(error)
      );
    }, this.updateTime);
  }

  private async getLocation(): Promise<Location> {
    let data = await this.locationService.getGeopostion();
    const item =
      this.locationService.randomItems[
        Math.floor(Math.random() * this.locationService.randomItems.length)
      ];
    const mockData = {
      coords: {
        latitude: item.lat,
        longitude: item.long,
      },
    };
    return {
      lat: mockData.coords.latitude,
      lon: mockData.coords.longitude,
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

    this.tilelayer = L.tileLayer(this.mapService.getMap().link, {
      maxZoom: 20,
      minZoom: 5,
    }).addTo(this.map);

    setTimeout( () => {
      this.tilelayer.addGoogleLayer('TrafficLayer')
    }, 1000);
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
              this.setViewOrRoute(map, user, data);
            })
            .on('contextmenu', (e) => {
              L.popup()
                // .setLatLng(e.latlng)
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

  private setViewOrRoute(map, user: User, data) {
    const cu = this.tokenstorageService.getUser();

    console.log('cu: ', cu);
    if (user.id !== (cu.id || cu.location['id'] || cu.location['userId'])) {
      const updatedCU = data.find((u) => u.username === cu.username);
      const route = `${updatedCU.location.lon},${updatedCU.location.lat};${user.location.lon},${user.location.lat}`;
      this.locationService.getOSRMRoute(route).subscribe((response) => {
        response['routes'].map((m) => {
          this.polyline = L.polyline(polyUtil.decode(m.geometry));
          this.polyline.addTo(map);
        });
      });
      map.setView(
        [updatedCU.location.lat, updatedCU.location.lon],
        this.panZoom
      );
    } else {
      map.setView([user.location.lat, user.location.lon], this.panZoom);
    }
  }
}
