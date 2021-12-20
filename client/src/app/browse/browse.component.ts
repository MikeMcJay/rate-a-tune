import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  searchValue: any;
  searchResult: any;

  constructor(private http: HttpClient, private titleService: Title) { }

  // HTTP header
  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  }

  ngOnInit(): void {
    // Set the page's title
    this.titleService.setTitle('Browse');
  }

  browseSpotify() {
    if (this.searchValue) {
      // Acquire a JSON object of 15 spotify songs and append to the searchResult variable
      let obs: Observable<object> = this.http.get('http://localhost:3000/browse/' + this.searchValue, this.requestOptions);
      obs.subscribe(response => {
        // console.log(JSON.parse(response.toString()).tracks);
        this.searchResult = JSON.parse(response.toString()).tracks;
      });
    }
  }

}
