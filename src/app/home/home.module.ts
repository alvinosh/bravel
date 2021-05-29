import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { HomePageRoutingModule } from './home-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from 'src/app/core/services/location/location.service';
import { ChatComponent } from './components/sidebar/components/chat/chat.component';
import { OnlineComponent } from './components/sidebar/components/online/online.component';
import { AddComponent } from './components/sidebar/components/add/add.component';
import { SettingsComponent } from './components/sidebar/components/settings/settings.component';
import { MessageComponent } from './components/sidebar/components/chat/message/message.component';
import { MessageFormComponent } from './components/sidebar/components/chat/message-form/message-form.component';
import { UserComponent } from './components/sidebar/components/online/user/user.component';

@NgModule({
  declarations: [
    ChatComponent,
    OnlineComponent,
    AddComponent,
    SettingsComponent,
    SidebarComponent,
    MapComponent,
    NavbarComponent,
    MessageComponent,
    MessageFormComponent,
    UserComponent,
    HomePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FontAwesomeModule,
  ],
  providers: [Geolocation, LocationService],
})
export class HomePageModule {}
