import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { FormComponent } from 'src/app/shared/components/form-elements/form/form.component';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';
import { TextInputComponent } from 'src/app/shared/components/form-elements/text-input/text-input.component';
import { ButtonComponent } from 'src/app/shared/components/form-elements/button/button.component';
import { AuthService } from '../../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    LoginPage,
    BackgroundComponent,
    FormComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  providers: [AuthService],
})
export class LoginPageModule {}
