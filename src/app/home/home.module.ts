import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { HomePageRoutingModule } from './home-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ChatComponent } from './sidebar/chat/chat.component';
import { OnlineComponent } from './sidebar/online/online.component';
import { AddComponent } from './sidebar/add/add.component';
import { SettingsComponent } from './sidebar/settings/settings.component';
import { MessageComponent } from './sidebar/chat/message/message.component';
import { MessageFormComponent } from './sidebar/chat/message-form/message-form.component';
import { UserComponent } from './sidebar/online/user/user.component';
import { GroupComponent } from './sidebar/chat/group/group.component';
import { RoomSettingsComponent } from './sidebar/chat/room-settings/room-settings.component';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

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
    GroupComponent,
    RoomSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [Geolocation],
})
export class HomePageModule {}
