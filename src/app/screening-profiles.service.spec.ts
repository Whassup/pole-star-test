import { TestBed, inject } from '@angular/core/testing';

import { ScreeningProfilesService } from './screening-profiles.service';

describe('ScreeningProfilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreeningProfilesService]
    });
  });

  it('should be created', inject([ScreeningProfilesService], (service: ScreeningProfilesService) => {
    expect(service).toBeTruthy();
  }));
});
