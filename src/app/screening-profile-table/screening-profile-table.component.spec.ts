import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningProfileTableComponent } from './screening-profile-table.component';

describe('ScreeningProfileTableComponent', () => {
  let component: ScreeningProfileTableComponent;
  let fixture: ComponentFixture<ScreeningProfileTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreeningProfileTableComponent ]
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
