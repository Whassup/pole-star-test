import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screening-profile-table',
  templateUrl: './screening-profile-table.component.html',
  styleUrls: ['./screening-profile-table.component.css']
})
export class ScreeningProfileTableComponent implements OnInit {
  profiles:Array<Object> = [{
    "id": "eaad94d1-4e5c-496b-a565-50bf4a6d1262",
    "created": "2016-03-07T08:01:46.013000Z",
    "modified": "2016-03-07T08:01:46.014000Z",
    "name": "Default Screening Profile",
    "country_check_severity": "90-CRITICAL"
  }]

  constructor() { }

  ngOnInit() {
  }

}
