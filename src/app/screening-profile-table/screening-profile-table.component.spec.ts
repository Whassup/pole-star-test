import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { ScreeningProfileTableComponent } from './screening-profile-table.component';
import { ScreeningProfilesService } from '../screening-profiles.service';

describe('ScreeningProfileTableComponent', () => {
  let component: ScreeningProfileTableComponent;
  let fixture: ComponentFixture<ScreeningProfileTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpModule,
        FormsModule
      ],
      declarations: [ ScreeningProfileTableComponent ],
      providers: [ScreeningProfilesService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreeningProfileTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
