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
  userRating: string = '';
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
    // Get the user session
    this.sessionID = this.userSession.getUserSession();
    routeParamObs.subscribe(params => {
      this.getSpotifySong(params.get('trackID'));
      // Acquire the tune's average rating
      this.getTuneRating(params.get('trackID'));
    });
  }

  deleteTuneRating() {
    let obs: Observable<object> = this.reviewService.deleteRating(this.track.id);
    obs.subscribe(response => {
      console.log((response));
    });
  }

  // getUser() {
  //   let obs: Observable<object> = this.reviewService.getUser(this.track.id, this.sessionID);
  //   obs.subscribe(response => {
  //     console.log((response));
  //   });
  // }

  addTuneRating() {
    let getObs: Observable<any> = this.reviewService.getRating(this.track.id);
    getObs.subscribe(response => {
      // Check if a rating has already been left by any user
      if (response === null) {
        let obs: Observable<object> = this.reviewService.addRating(this.track.id, this.userRating, this.sessionID);
        obs.subscribe(response => {
          console.log(response);
        });
      } else {
        // Check if the current user has already left a rating
        let getUserObs: Observable<object> = this.reviewService.getUserRatings(this.track.id, this.sessionID);
        getUserObs.subscribe(response => {
          // If the response is null the current user hasn't added a rating
          if (response === null) {
            let obs: Observable<object> = this.reviewService.insertRating(this.track.id, this.userRating, this.sessionID);
            obs.subscribe(response => {
              console.log(response);
            });
          } else {
            // If it isn't null, we just need to update the rating
            let obs: Observable<object> = this.reviewService.updateRating(this.track.id, this.userRating, this.sessionID);
            obs.subscribe(response => {
              console.log(response);
            });
          }
        });
      }
    });
  }

  getTuneRating(trackID: string) {
    let obs: Observable<any> = this.reviewService.getRating(trackID);
    obs.subscribe(response => {
      // Check whether the song has a rating to show
      if (response) {
        let decimalPlaces = 1;
        this.trackRating = Math.trunc(response.rating * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
        // Check whether the user has a rating to show
        let getUserObs: Observable<any> = this.reviewService.getUserRatings(trackID, this.sessionID);
        getUserObs.subscribe(response => {
          // If the response isn't null the current user has added a review
          if (response) {
            let user = response.user;
            for(let i = 0, l = Object.values(response).length - 1; i < l; i++) {
              if (user[i]['_id'] === this.sessionID) {
                this.userRating = user[i].rating;
              }
            }
          }
        });
      } else {
        this.trackRating = 'No ratings yet';
      }
    });
  }

  getSpotifySong(trackID: string) {
    let obs: Observable<object> = this.http.get('http://localhost:3000/getSong/' + trackID, this.requestOptions);
    obs.subscribe(response => {
      this.track = JSON.parse(response.toString());
    });
  }

}
