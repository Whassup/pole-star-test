import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ScreeningProfilesService {

  constructor(public http: Http) {}

  getScreeningProfiles(): Promise<Object> {
    return Promise.resolve( this.getData() );
  }

  getData() {
    return this.http.get('/assets/screenings.json')
        .map((res: Response) => res.json().results);
  }

}


