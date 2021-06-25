import { Injectable } from '@angular/core';

import { Location } from 'src/app/shared/models/Location';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private geolocation: Geolocation) {}

  async getCoords(): Promise<Location> {
    let res;
    try {
      res = await this.geolocation.getCurrentPosition();
    } catch (error) {
      console.log(error);
    }
    return { lat: res.coords.latitude, lon: res.coords.longitude };
  }
}
