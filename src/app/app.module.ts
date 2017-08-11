import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ScreeningProfilesService } from './screening-profiles.service';
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
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [ScreeningProfilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
