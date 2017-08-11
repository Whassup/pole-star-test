import { Observable } from 'rxjs/Rx';
import { ScreeningProfilesService } from '../screening-profiles.service';
import { Component, OnInit } from '@angular/core';

enum SortType {
    Numeric = 1,
    Alpha = 2,
    Date = 3
}

@Component({
  selector: 'app-screening-profile-table',
  templateUrl: './screening-profile-table.component.html',
  styleUrls: ['./screening-profile-table.component.css']
})
export class ScreeningProfileTableComponent implements OnInit {
  private profilesUnfiltered:object[]=[]//This is a cache view of the profiles to be utilised for filtering
  private profiles:object[]=[]//This is the display view of the profiles
  private sortProps = {
    active : "name",
    reverse: false,
    type: SortType.Alpha
  }
  private filterProps = {
    name: "",
    ok : false,
    warning : false,
    critical : false
  }

  constructor(private screeningProfileService:ScreeningProfilesService) { }

  ngOnInit() {
    //Get profiles data from endpoint and sort by name attribute
    this.getProfiles( (data:object[]) => this.sort(this.sortProps.type, this.sortProps.active, this.sortProps.reverse) )
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
    this.profilesUnfiltered = this.profiles
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

  //Sort the profiles by a specific property in aplha-numeric order
  //@param type - Type of sort to performa
  //@param name - The name of the property value to sort by
  //@param boolean - flag for where sort order should be reversed.
  sort(type:SortType=this.sortProps.type,name:string=this.sortProps.active,reverse?:boolean ) {
    //toggle sort direction if active selection is the same and no specific direction has been provided
    if( name === this.sortProps.active && reverse === undefined) reverse = !this.sortProps.reverse
    
    //Set new sort properties
    this.sortProps.type = type
    this.sortProps.active = name
    this.sortProps.reverse = reverse
    
    //create sort ascending or descending funciton as required
    let sort = this.generateSortFunction(type, reverse)

    //Sort profiles
    this.profiles = this.profiles.sort( (profileA, profileB) =>  sort( profileA[name], profileB[name] ) )
  }

  // Creates a sort function of a specific type and specific direction
  // @param type - Define the type of sort function to be built
  // @param reverse - Define the sort direction for the function
  // @returns - Returns a sorting function
  generateSortFunction(type:SortType=SortType.Numeric,reverse:boolean=false) :(a:any, b:any) => number {
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

    if(type === SortType.Alpha) {
      return function alphaSort(a:string,b:string){
        return numericSort( a.toLowerCase(), b.toLowerCase() )
      }
    }

    if(type === SortType.Date) {
      return function dateSort(a:any,b:any){
        return numericSort( b.getTime(), a.getTime() )
      }
    }

    return numericSort
  }

  //Run filtering on profiles table
  filter(){
    console.log( this.filterProps )
    this.profiles = this.filterProfilesByName(this.profilesUnfiltered)
    this.profiles = this.filterProfilesByCountryCheckSeverity(this.profiles)
    //Re-sorting is required after filtering as the profilesUnfiltered is never sorted
    this.sort(this.sortProps.type, this.sortProps.active, this.sortProps.reverse)
  }

  //Filter profiles by name
  filterProfilesByName(profilesUnfiltered:object[]):object[]{
    return profilesUnfiltered.filter( profile => 
      profile['name'].toLowerCase().startsWith( this.filterProps.name.toLowerCase() )
    )
  }

  //Filter profiles by severity type
  filterProfilesByCountryCheckSeverity(profilesUnfiltered:object[]):object[]{
    //Only filter if one is set
    if( this.filterProps.critical || this.filterProps.warning || this.filterProps.ok ) {
      return profilesUnfiltered.filter( profile => {
        let test = false
        if(this.filterProps.critical) test = (profile['country_check_severity'] == "Critical")
        if(!test && this.filterProps.warning) test = (profile['country_check_severity'] == "Warning")
        if(!test && this.filterProps.ok) test = (profile['country_check_severity'] == "Ok")
        return test
      })
    } else {
      return profilesUnfiltered
    }
     
  }
}
