import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScreeningProfileTableComponent } from './screening-profile-table/screening-profile-table.component';
import { ScreeningProfilesService } from './screening-profiles.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ScreeningProfileTableComponent
      ],
      imports: [
        BrowserModule,
        HttpModule,
        FormsModule
      ],
      providers: [ScreeningProfilesService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Screening Profiles'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Screening Profiles');
  }));

});
