import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputType } from 'src/app/shared/models/Input';
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() empty: boolean = false;
  @Input() label: string;
  @Input() type: InputType = InputType.Text;

  public value: string;

  public changed: (val: string) => void;

  public touched: () => void;

  public isDisabled: boolean;

  constructor() {}

  getInput(type: InputType): string {
    switch (type) {
      case InputType.Email:
        return 'email';
      case InputType.Password:
        return 'password';
      case InputType.Text:
        return 'text';
      case InputType.Number:
        return 'number';
      case InputType.Checkbox:
        return 'checkbox';
    }
  }

  writeValue(obj: string): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.changed = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
