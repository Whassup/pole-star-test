import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScreeningProfileTableComponent } from './screening-profile-table/screening-profile-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreeningProfileTableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
