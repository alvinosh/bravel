import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { HomePageRoutingModule } from './home-routing.module';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from 'src/app/home/services/location.service';
import { ChatComponent } from './components/sidebar/components/chat/chat.component';
import { OnlineComponent } from './components/sidebar/components/online/online.component';
import { AddComponent } from './components/sidebar/components/add/add.component';
import { SettingsComponent } from './components/sidebar/components/settings/settings.component';
import { MessageComponent } from './components/sidebar/components/chat/message/message.component';
import { MessageFormComponent } from './components/sidebar/components/chat/message-form/message-form.component';
import { UserComponent } from './components/sidebar/components/online/user/user.component';
import { GroupComponent } from './components/sidebar/components/chat/group/group.component';
import { UsersService } from '../core/services/users.service';
import { SocketioService } from '../core/services/socketio.service';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

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
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FontAwesomeModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [Geolocation, LocationService, UsersService, SocketioService],
})
export class HomePageModule {}
