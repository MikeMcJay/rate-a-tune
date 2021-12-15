import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RatingService} from "../rating.service";
import {SessionService} from "../session.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {

  track: any = null;
  trackRating: any = null;
  sessionID: any = null;

  constructor(private http: HttpClient, private Activatedroute:ActivatedRoute, private reviewService: RatingService,
              private userSession: SessionService) {
  }

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

  addTuneRating() {
    // Get the user session
    this.sessionID = this.userSession.getUserSession();
    // this.reviewService.addRating(this.track.id, sessionID)
    let obs: Observable<object> = this.reviewService.addRating(this.track.id, this.sessionID);
    obs.subscribe(response => {
      console.log(response);
    });
    // this.reviewService.addRating(this.track.id, sessionID).then(obs => {
    //   obs.subscribe(response => {
    //     console.log(response)
    //   });
    // });
  }

  getTuneRating() {
    let obs: Observable<object> = this.reviewService.getRating(this.track.id);
    obs.subscribe(response => {
      console.log(JSON.parse(response.toString()));
    });
  }

  getSpotifySong(trackID: string) {
    let obs: Observable<object> = this.http.get('http://localhost:3000/getSong/' + trackID, this.requestOptions);
    obs.subscribe(response => {
      this.track = JSON.parse(response.toString());
    });
  }

}
