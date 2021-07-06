import { Injectable } from '@angular/core';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private geolocation: Geolocation) {}

  getGeopostion(): Promise<Geoposition> {
    return this.geolocation.getCurrentPosition();
  }
}
