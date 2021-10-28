import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
})
export class CustomDropdownComponent implements OnInit {
  @Input() options: string[] = [];
  @Input() selectedValue: string | null = null;
  @Input() label: string = '';
  isDropdownShown = false;

  @Output() valueChosed = new EventEmitter<string>();

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownShown = false;
    }
  }

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {}

  onSelectOption(val: string) {
    this.selectedValue = val;
    this.valueChosed.emit(val);
  }
}
