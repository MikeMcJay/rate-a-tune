import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  // HTTP header
  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  }

  deleteRating(trackID: string) {
    // Returns an observable object
    return this.http.delete('http://localhost:3000/deleteRating/' + trackID, this.requestOptions);
  }

  getRating(trackID: string) {
    // Returns an observable object
    return this.http.get('http://localhost:3000/getRating/' + trackID, this.requestOptions);
  }

  getUserRatings(trackID: string, uid: string) {
    // Returns an observable object
    return this.http.post('http://localhost:3000/getUser/' + trackID + '/' + uid, this.requestOptions);
  }

  insertRating(trackID: string, userRating:string, uid: string) {
    // Returns an observable object
    return this.http.patch('http://localhost:3000/insertRating/' + trackID + '/' + uid,
      {userRating: userRating}, this.requestOptions);
  }

  addRating(trackID: string, userRating: string, uid: string) {
    // Returns an observable object
    return this.http.post('http://localhost:3000/addRating/' + trackID + '/' + uid,
      {userRating: userRating}, this.requestOptions);
  }

  updateRating(trackID: string, userRating: string, uid: string) {
    // Returns an observable object
    return this.http.patch('http://localhost:3000/updateRating/' + trackID + '/' + uid,
      {userRating: userRating}, this.requestOptions);
  }
}
