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
  private profiles:object[]

  constructor(private screeningProfileService:ScreeningProfilesService) { }

  ngOnInit() {
    this.getProfiles( (data:object[]) => this.sortProfilesByAplha('name') )
  }

  //Get profiles from service
  getProfiles( callback: (data:object[]) => void ){
    this.screeningProfileService.getScreeningProfiles().then( 
      (observer:Observable<any>) =>  {
        observer.subscribe( 
          (data:object[])  => {
            this.mapProfiles(data)
            callback(data)
          }
        )
      }
    )
  }

  //Map the profiles from service into a standarised structure
  mapProfiles(data:object[]){
    this.profiles = data.map( (profile:object) => {
      return { 
        'id': profile['id'],
        'created': profile['created'],
        'modified': profile['modified'],
        "name": profile['name'],
        "country_check_severity": this.convertCountryCheckSeverity( profile['country_check_severity'] )
      }
    })
  }

  //Convert country check severity to its' display format
  convertCountryCheckSeverity(value:string){
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

  sortProfilesByAplha(name:string,reverse:boolean=false ) {
    //create sort ascending or descending funciton as required
    let alphaSort = function(){
      const alphaSort = function alphaSort(a:string,b:string){
          a = a.toLowerCase()
          b = b.toLowerCase()
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
      }
      if(reverse) {//sort Z-A
        return function sortZA(a:string,b:string){
          return alphaSort (b,a);
        }
      }
      return function sortAZ(a:string,b:string){
          return alphaSort (a,b);
      }
    }()
    

    this.profiles = this.profiles.sort( (profileA, profileB) =>  alphaSort( profileA[name], profileB[name].toLowerCase()) )
  }

}
