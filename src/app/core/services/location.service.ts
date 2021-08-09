import {Injectable} from '@angular/core';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  randomItems = [
    {
      lat: 41.330292,
      long: 19.817799
    },
    {
      lat: 41.332474383625645,
      long: 19.81458373534945
    },
    {
      lat: 41.32390306668028,
      long: 19.797100972210536
    },
    {
      lat: 41.33827790879272,
      long: 19.789523103137356
    },
    {
      lat: 41.32082260011389,
      long: 19.7868720814094
    },
    {
      lat: 41.32163043012731,
      long: 19.78896748885997
    },
    {
      lat: 41.32581609747218,
      long: 19.8037092626156
    },
    {
      lat: 41.3164647190096,
      long: 19.773258791602178
    },
    {
      lat: 41.314692828443626,
      long: 19.76870895169821
    }
  ];

  constructor(private geolocation: Geolocation, private http: HttpClient) {
  }

  getGeopostion(): Promise<Geoposition> {
    return this.geolocation.getCurrentPosition();
  }

  getOSRMRoute(route) {
    return this.http.get('http://localhost:4200/route' + '/v1/driving/' + route);
    return this.http.get('http://localhost:4200/route' + '/v1/driving/' + route + '?overview=full');
    return this.http.get('http://router.project-osrm.org/route/v1/driving/' + route);
  }
}
