import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { FilterModule } from './features/filter/filter.module';
import { SharedModule } from './shared/shared.module';

const components = [AppComponent]
const modules = [BrowserModule,ReactiveFormsModule, SharedModule, FilterModule,
 HttpClientModule]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
