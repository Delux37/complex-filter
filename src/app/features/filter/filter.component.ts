import { FilterService } from './services/filter.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {  
  constructor(public filterService:FilterService) { }
  temp: FormControl = new FormControl()
  form = new FormGroup({
    sellingType: new FormControl(),
    brand: new FormControl(),
    model: new FormControl(),
    category: new FormControl(),
    yearFrom: new FormControl(),
    yearTo: new FormControl(),
    priceFrom: new FormControl(),
    priceTo: new FormControl(),
    engineSizeFrom: new FormControl(),
    engineSizeTo: new FormControl(),
    transmission: new FormControl(),
    fuel: new FormControl(),
    upload: new FormControl(),
    search: new FormControl(),
    custom: new FormControl(),
    wheel: new FormControl(),
    location: new FormControl()
  })

  ngOnInit() {
    this.form.controls.brand = this.filterService.buildModelControl()
    this.form.controls.search = this.filterService.buildSearchTermControl()
  }
  onSubmit() {
  }
}
