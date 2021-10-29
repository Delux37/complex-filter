import { Component, forwardRef,  Input,  Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTRY_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomInputComponent),
  multi: true,
};


@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [COUNTRY_CONTROL_VALUE_ACCESSOR],
})
export class CustomInputComponent implements ControlValueAccessor {

  constructor() { }

  @Input() placeholder = ''
  value = '';
  disabled = false;
  onTouch!: Function;
  onChange!: Function;


  ngOnInit(): void {
  }

  writeValue(value: string): void {
    this.value = value
  }
  registerOnChange(fn: any): void {
    this.onChange = fn; // <-- save the function
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn; // <-- save the function
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

}
