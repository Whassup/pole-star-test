import { inject, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { ScreeningProfilesService } from './screening-profiles.service';

describe('ScreeningProfilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpModule,
        FormsModule
      ],
      providers: [ScreeningProfilesService]
    });
  });

  it('should be created', inject([ScreeningProfilesService], (service: ScreeningProfilesService) => {
    expect(service).toBeTruthy();
  }));
});
