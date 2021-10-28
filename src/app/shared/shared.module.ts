import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';

const components = [CustomDropdownComponent]
const modules = [CommonModule, ReactiveFormsModule]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
