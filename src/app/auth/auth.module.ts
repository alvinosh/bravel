import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from 'src/app/core/services/location.service';
import { TextInputComponent } from '../shared/components/form-elements/text-input/text-input.component';
import { FormComponent } from '../shared/components/form-elements/form/form.component';
import { ButtonComponent } from '../shared/components/form-elements/button/button.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AuthPageRoutingModule],
  declarations: [AuthPage],
  providers: [Geolocation, LocationService],
})
export class AuthPageModule {}
