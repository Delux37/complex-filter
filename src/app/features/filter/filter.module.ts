import { FilterService } from './services/filter.service';
import { FilterComponent } from './filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const modules = [CommonModule, SharedModule, ReactiveFormsModule];
const components = [FilterComponent]

@NgModule({
  declarations: [...components],
  imports: [ ...modules],
  exports: [...components],
  providers: [FilterService]
})
export class FilterModule { }
