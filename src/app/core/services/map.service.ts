import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { MapName } from 'src/app/shared/models/map';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  maps: MapName[] = [
    {
      name: 'Default',
      link: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
    {
      name: 'Hot',
      link: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    },
    {
      name: 'Kart',
      link: 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
    },
    {
      name: 'Height',
      link: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    },
    {
      name: 'Smooth',
      link: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
    },
    {
      name: 'Dark',
      link: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    },
    {
      name: 'Light',
      link: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png',
    },
  ];

  map_index = 0;

  map_subject = new Subject<MapName>();

  constructor() {}

  getSubject(): Subject<MapName> {
    return this.map_subject;
  }

  getMap(): MapName {
    return this.maps[this.map_index];
  }

  getMaps(): MapName[] {
    return this.maps;
  }

  setIndex(i: number) {
    this.map_index = i;
    this.map_subject.next(this.getMap());
  }
}
