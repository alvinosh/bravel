import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';

import { FormComponent } from 'src/app/shared/components/form-elements/form/form.component';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';
import { TextInputComponent } from 'src/app/shared/components/form-elements/text-input/text-input.component';
import { ButtonComponent } from 'src/app/shared/components/form-elements/button/button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SignupPageRoutingModule,
  ],
  declarations: [
    SignupPage,
    FormComponent,
    BackgroundComponent,
    TextInputComponent,
    ButtonComponent,
  ],
})
export class SignupPageModule {}
