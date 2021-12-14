import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  searchValue: any;
  searchResult: any;

  constructor(private http: HttpClient) { }

  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  }

  ngOnInit(): void {
  }

  // leaveReview(trackID: string) {
  //   window.open('/review/' + trackID);
  // }

  browseSpotify() {
    let obs: Observable<object> = this.http.get('http://localhost:3000/browse/' + this.searchValue, this.requestOptions);
    obs.subscribe(response => {
      console.log(JSON.parse(response.toString()).tracks);
      this.searchResult = JSON.parse(response.toString()).tracks;
    });
  }

}
