import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {

  track: any = null;

  constructor(private http: HttpClient, private Activatedroute:ActivatedRoute) { }

  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  }

  ngOnInit() {
    let routeParamObs: Observable<any> = this.Activatedroute.paramMap;
    routeParamObs.subscribe(params => {
      console.log(params.get('trackID'));
      this.getSpotifySong(params.get('trackID'));
    });
  }

  getSpotifySong(trackID: string) {
    let obs: Observable<object> = this.http.get('http://localhost:3000/getSong/' + trackID, this.requestOptions);
    obs.subscribe(response => {
      this.track = JSON.parse(response.toString());
    });
  }

}
