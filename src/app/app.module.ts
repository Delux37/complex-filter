import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

const components = [AppComponent]
const modules = [BrowserModule]

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
