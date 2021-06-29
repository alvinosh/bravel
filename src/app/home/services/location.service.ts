import { Injectable } from '@angular/core';

import { Location } from 'src/app/shared/models/DTOs/Location';

import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private geolocation: Geolocation) {}

  getGeopostion(): Observable<Geoposition> {
    return from(this.geolocation.getCurrentPosition());
  }
}
