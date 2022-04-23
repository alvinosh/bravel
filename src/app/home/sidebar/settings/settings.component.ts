import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenstorageService } from 'src/app/auth/services/tokenstorage.service';
import { MapService } from 'src/app/core/services/map.service';
import { User } from 'src/app/shared/models/DTOs/User';
import { MapName } from 'src/app/shared/models/map';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  maps: MapName[];
  maps_type: MapName[];

  ii = 0;
  ij = 0;
  ik = false;

  constructor(
    private token: TokenstorageService,
    private mapService: MapService
  ) {
    this.maps = mapService.getMaps();
    this.maps_type = mapService.getMapsType();

    this.ii = mapService.map_index;
    this.ij = mapService.map_type_index;
    this.ik = mapService.getTraffic();
  }

  onChange() {
    this.mapService.setIndex(this.ii);
  }

  onChangeType() {
    this.mapService.setIndexType(this.ij);
  }

  onChangeTraffic() {
    console.log(this.ik);

    this.mapService.setTraffic(this.ik);
  }

  getUser(): User {
    return this.token.getUser();
  }

  logout() {
    this.token.signOut();
  }
}
