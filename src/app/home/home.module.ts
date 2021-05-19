import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [MapComponent, NavbarComponent, HomePage],

  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
})
export class HomePageModule {}
