import { Injectable } from '@angular/core';

import { MapName, Map } from 'src/app/shared/models/map';
import { BehaviorSubject, Subject } from 'rxjs';
import { AUBERGINE, DARK, NIGHT, RETRO, STANDARD } from './map.themes';

const MAP_TYPE = 'map-type';
const MAP_STYLE = 'map-style';
const FOLLOW = 'follow';
const TRAFFIC = 'traffic';

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

  map_subject: BehaviorSubject<Map>;

  traffic = false;
  follow = false;

  constructor() {
    this.map_index = JSON.parse(localStorage.getItem(MAP_STYLE));
    this.map_type_index = JSON.parse(localStorage.getItem(MAP_TYPE));
    this.traffic = JSON.parse(localStorage.getItem(TRAFFIC));
    this.follow = JSON.parse(localStorage.getItem(FOLLOW));

    if (!this.map_index) this.map_index = 0;
    if (!this.map_type_index) this.map_type_index = 0;
    if (this.traffic == null) this.traffic = true;
    if (this.follow == null) this.follow = true;

    localStorage.setItem(MAP_STYLE, JSON.stringify(this.map_index));
    localStorage.setItem(MAP_TYPE, JSON.stringify(this.map_type_index));
    localStorage.setItem(TRAFFIC, JSON.stringify(this.traffic));
    localStorage.setItem(FOLLOW, JSON.stringify(this.follow));

    this.map_subject = new BehaviorSubject<Map>({
      style: this.getMap().data,
      type: this.getMapType().data,
      traffic: this.getTraffic(),
    });
  }

  getTraffic(): boolean {
    return this.traffic;
  }

  setTraffic(bool: boolean) {
    this.traffic = bool;
    localStorage.setItem(TRAFFIC, JSON.stringify(this.traffic));
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
    localStorage.setItem(MAP_STYLE, JSON.stringify(this.map_index));
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
    localStorage.setItem(MAP_TYPE, JSON.stringify(this.map_type_index));
    this.map_subject.next({
      style: this.getMap().data,
      type: this.getMapType().data,
      traffic: this.getTraffic(),
    });
  }

  setFollow(bool: boolean) {
    this.follow = bool;
    localStorage.setItem(FOLLOW, JSON.stringify(this.follow));
  }
}
