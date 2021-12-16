import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  deleteRating(trackID: string) {
    return this.http.delete('http://localhost:3000/deleteRating/' + trackID, this.requestOptions);
  }

  getRating(trackID: string) {
    return this.http.get('http://localhost:3000/getRating/' + trackID, this.requestOptions);
  }

  insertRating(trackID: string, uid: string) {
    return this.http.patch('http://localhost:3000/insertRating/' + trackID + '/' + uid, this.requestOptions);
  }

  addRating(trackID: string, uid: string) {
    // Determine if there exists a rating for the song already
    return this.http.post('http://localhost:3000/addRating/' + trackID + '/' + uid, this.requestOptions);
  }
}
