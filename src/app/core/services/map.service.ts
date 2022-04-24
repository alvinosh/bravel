import { Injectable } from '@angular/core';

import { MapName, Map } from 'src/app/shared/models/map';
import { Subject } from 'rxjs';
import { AUBERGINE, DARK, NIGHT, RETRO, STANDARD } from './map.themes';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  maps: MapName[] = [
    {
      name: 'Standard',
      data: STANDARD,
    },
    {
      name: 'Aubergine',
      data: AUBERGINE,
    },
    {
      name: 'Dark',
      data: DARK,
    },
    {
      name: 'Night',
      data: NIGHT,
    },
    {
      name: 'Retro',
      data: RETRO,
    },
  ];

  maps_type: MapName[] = [
    {
      name: 'Road Map',
      data: 'roadmap',
    },
    {
      name: 'Satelite',
      data: 'satelite',
    },
    {
      name: 'Terrain',
      data: 'terrain',
    },
    {
      name: 'Hybrid',
      data: 'hybrid',
    },
  ];

  map_index = 0;
  map_type_index = 0;

  map_subject = new Subject<Map>();

  traffic = true;
  follow = true;

  constructor() {}

  getTraffic(): boolean {
    return this.traffic;
  }

  setTraffic(bool: boolean) {
    this.traffic = bool;
    this.map_subject.next({
      style: this.getMap().data,
      type: this.getMapType().data,
      traffic: this.getTraffic(),
    });
  }

  getSubject(): Subject<Map> {
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
    this.map_subject.next({
      style: this.getMap().data,
      type: this.getMapType().data,
      traffic: this.getTraffic(),
    });
  }

  getMapType(): MapName {
    return this.maps_type[this.map_type_index];
  }

  getMapsType(): MapName[] {
    return this.maps_type;
  }

  setIndexType(i: number) {
    this.map_type_index = i;
    this.map_subject.next({
      style: this.getMap().data,
      type: this.getMapType().data,
      traffic: this.getTraffic(),
    });
  }

  setFollow(bool: boolean) {
    this.follow = bool;
  }
}
