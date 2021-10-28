import { FilterService } from './services/filter.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {  
  constructor(public filterService:FilterService) { }
  temp: FormControl = new FormControl()
  form = new FormGroup({
    sellingType: new FormControl(),
    brand: new FormControl(),
    model: new FormControl(),
    category: new FormControl()
  })

  ngOnInit() {
    
    this.form.controls.brand = this.filterService.buildModelControl()
  }
  onSubmit() {
  }
}
