import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScreeningProfileTableComponent } from './screening-profile-table/screening-profile-table.component';
import { ScreeningProfilesService } from './screening-profiles.service';

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
