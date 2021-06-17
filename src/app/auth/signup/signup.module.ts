import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { BackgroundComponent } from '../shared/background/background.component';

import { SignupPage } from './signup.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SignupPageRoutingModule],
  declarations: [SignupPage, BackgroundComponent],
})
export class SignupPageModule {}
