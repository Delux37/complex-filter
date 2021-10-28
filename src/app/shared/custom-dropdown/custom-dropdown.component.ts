import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
  EventEmitter,
  forwardRef,
  Provider,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const COUNTRY_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomDropdownComponent),
  multi: true,
};

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
  providers: [COUNTRY_CONTROL_VALUE_ACCESSOR],
})
export class CustomDropdownComponent implements ControlValueAccessor  {
  @Input() options: string[] = [];
  @Input() selectedValue: string | null = null;
  @Input() label: string = '';
  isDropdownShown = false;
  disabled = false;
  private onTouched!: Function;
  private onChanged!: Function;

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownShown = false;
    }
  }

  constructor(private eRef: ElementRef) {}

  onSelectOption(val: string) {
    this.selectedValue = val;
    this.onTouched()
    this.onChanged(val)
  }

  writeValue(value: string): void {
    value ? this.selectedValue = 'value' : '';
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn; // <-- save the function
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn; // <-- save the function
  }
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
