import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  }

  // getRating(trackID: string) {
  //   let obs: Observable<object> = this.http.get('http://localhost:3000/getSong/' + trackID, this.requestOptions);
  //   obs.subscribe(response => {
  //     this.track = JSON.parse(response.toString());
  //   });
  // }
}
