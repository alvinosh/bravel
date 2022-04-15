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

  ii = 0;

  constructor(
    private token: TokenstorageService,
    private mapService: MapService,
    private router: Router
  ) {
    this.maps = mapService.getMaps();
  }

  onChange() {
    this.mapService.setIndex(this.ii);
  }

  getUser(): User {
    return this.token.getUser();
  }

  logout() {
    this.token.signOut();
    this.router.navigate(['/login']);
  }
}
