import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundComponent } from './components/background/background.component';
import { FormComponent } from './components/form-elements/form/form.component';
import { TextInputComponent } from './components/form-elements/text-input/text-input.component';
import { ButtonComponent } from './components/form-elements/button/button.component';

@NgModule({
  declarations: [
    BackgroundComponent,
    FormComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  imports: [CommonModule],
  exports: [
    BackgroundComponent,
    FormComponent,
    TextInputComponent,
    ButtonComponent,
  ],
})
export class SharedModule {}
