import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';

import { FormComponent } from 'src/app/shared/components/form-elements/form/form.component';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SignupPageRoutingModule],
  declarations: [SignupPage, FormComponent, BackgroundComponent],
})
export class SignupPageModule {}
