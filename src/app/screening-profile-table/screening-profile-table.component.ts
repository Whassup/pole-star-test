import { observable } from 'rxjs/symbol/observable';
import { Observable } from 'rxjs/Rx';
import { ScreeningProfilesService } from '../screening-profiles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screening-profile-table',
  templateUrl: './screening-profile-table.component.html',
  styleUrls: ['./screening-profile-table.component.css']
})
export class ScreeningProfileTableComponent implements OnInit {
  private profiles:Object[] = [{
    "id": "eaad94d1-4e5c-496b-a565-50bf4a6d1262",
    "created": "2016-03-07T08:01:46.013000Z",
    "modified": "2016-03-07T08:01:46.014000Z",
    "name": "Default Screening Profile",
    "country_check_severity": "90-CRITICAL"
  }]
  private data

  constructor(private screeningProfileService:ScreeningProfilesService) { }

  ngOnInit() {
    this.getProfiles()
  }

  //Get profiles from service
  getProfiles(){
    this.screeningProfileService.getScreeningProfiles().then( 
      (observer:Observable<any>) =>  {
        observer.subscribe( 
          data  => this.mapProfiles(data)
        )
      }
    )
  }

  //Map the profiles from service into a standarised structure
  mapProfiles(data:Object[]){
    this.profiles = data.map( (profile:Object) => {
      return { 
        'id': profile['id'],
        'created': profile['created'],
        'modified': profile['modified'],
        "name": profile['name'],
        "country_check_severity": this.convertCountryCheckSeverity( profile['country_check_severity'] )
      }
    })
  }

  //Convert country check severity to its display format
  convertCountryCheckSeverity(value:String){
    switch(value){
      case "90-CRITICAL":
        return "Critical"
      case "70-WARNING" :
        return "Warning"
      case "60-OK" :
        return "Ok"
    }

    return ""
  }

}
