import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';

const components = [CustomDropdownComponent, CustomInputComponent, CustomButtonComponent]
const modules = [CommonModule, ReactiveFormsModule, FormsModule]

@NgModule({
  declarations: [
    ...components,
    CustomButtonComponent,
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components
  ]
})
export class SharedModule { }
