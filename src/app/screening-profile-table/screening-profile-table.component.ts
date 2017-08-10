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
  private sort = {
    activeAttribute : "name",
    reverse: false
  }

  constructor(private screeningProfileService:ScreeningProfilesService) { }

  ngOnInit() {
    this.getProfiles( (data:object[]) => this.sortProfiles('alpha', this.sort.activeAttribute, this.sort.reverse ) )
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
        'created': new Date(profile['created']),
        'modified': new Date(profile['modified']),
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

  sortByHeader(type:string, name:string ){
    if( name === this.sort.activeAttribute) this.sort.reverse = !this.sort.reverse
    this.sort.activeAttribute = name
    this.sortProfiles(type, name, this.sort.reverse )
  }

  generateSortFunction(type:string,reverse:boolean) {
    let numericSort = function(reverse:boolean){
      const sort = function (a:string|number,b:string|number){
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
      }
      if(reverse) {
        return function numericSortDescending(a:string|number,b:string|number){
          return sort(b,a);
        }
      }
      return function numericSortAscending(a:string|number,b:string|number){
          return sort(a,b);
      }
    }(reverse)

    if(type === "alpha") {
      return function alphaSort(a:string,b:string){
        return numericSort( a.toLowerCase(), b.toLowerCase() )
      }
    }

    if(type === "alpha") {
      return function alphaSort(a:string,b:string){
        return numericSort( a.toLowerCase(), b.toLowerCase() )
      }
    }

    if(type === "date") {
      return function dateSort(a:any,b:any){
        return numericSort( b.getTime(), a.getTime() )
      }
    }

    return numericSort
  }
  
  
  //Sort the profiles by a specific property in aplha-numeric order
  //@param name - The name of the property value to sort by
  //@param boolean - flag for where sort order should be reversed.
  sortProfiles(type:string,name:string,reverse:boolean=false ) {
    //create sort ascending or descending funciton as required
    let sort = this.generateSortFunction(type,reverse)
    this.profiles = this.profiles.sort( (profileA, profileB) =>  sort( profileA[name], profileB[name] ) )
  }

}
