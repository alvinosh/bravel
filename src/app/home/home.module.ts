import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

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

import { FormComponent } from 'src/app/shared/components/form-elements/form/form.component';
import { TextInputComponent } from 'src/app/shared/components/form-elements/text-input/text-input.component';
import { ButtonComponent } from 'src/app/shared/components/form-elements/button/button.component';

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
    FormComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [Geolocation, LocationService, UsersService, SocketioService],
})
export class HomePageModule {}
