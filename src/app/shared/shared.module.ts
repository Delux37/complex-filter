import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';

const components = [CustomDropdownComponent]
const modules = [CommonModule]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
