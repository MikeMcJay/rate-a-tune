import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RatingService } from "../rating.service";
import { SessionService } from "../session.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {

  track: any = null;
  trackRating: any = null;
  starCount: any = null;
  userRating: string = '';
  sessionID: any = null;
  error: any;

  constructor(private http: HttpClient, private Activatedroute:ActivatedRoute, private reviewService: RatingService,
              public userSession: SessionService) {
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
    // Reset the error
    this.error = null;
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
    let obs: Observable<any> = this.reviewService.deleteRating(this.track.id);
    obs.subscribe(response => {
      // console.log(response);
      window.location.reload();
    });
  }

  addTuneRating() {
    let getObs: Observable<any> = this.reviewService.getRating(this.track.id);
    getObs.subscribe(response => {
      // Check if a rating has already been left by any user
      if (response === null) {
        let obs: Observable<any> = this.reviewService.addRating(this.track.id, this.userRating, this.sessionID);
        obs.subscribe(response => {
          // console.log(response);
          // Reload the page with the added result
          window.location.reload();
        });
      } else {
        // Check if the current user has already left a rating
        let getUserObs: Observable<any> = this.reviewService.getUserRatings(this.track.id, this.sessionID);
        getUserObs.subscribe(response => {
          // If the response is null the current user hasn't added a rating
          if (response === null) {
            let obs: Observable<any> = this.reviewService.insertRating(this.track.id, this.userRating, this.sessionID);
            obs.subscribe(response => {
              // console.log(response);
              window.location.reload();
            });
          } else {
            // If it isn't null, we just need to update the rating
            let obs: Observable<any> = this.reviewService.updateRating(this.track.id, this.userRating, this.sessionID);
            obs.subscribe(response => {
              // console.log(response);
              window.location.reload();
            });
          }
        });
      }
    });
  }

  getTuneRating(trackID: string) {
    let obs: Observable<any> = this.reviewService.getRating(trackID);
    obs.subscribe(
      response => {
      // Check whether the song has a rating to show
      if (response) {
        let decimalPlaces = 1;
        this.trackRating = Math.trunc(response.rating * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
        // Create the number of stars to be shown
        this.starCount = '⭐'.repeat(parseInt(this.trackRating));
        // Check whether the user has a rating to show
        let getUserObs: Observable<any> = this.reviewService.getUserRatings(trackID, this.sessionID);
        getUserObs.subscribe(response => {
          // If the response isn't null the current user has added a review
          if (response) {
            let user = response.user;
            for(let i = 0, l = Object.values(response).length; i < l; i++) {
              // Safely access the nested _id property without flagging it as undefined
              if (user[i] && user[i]._id === this.sessionID) {
                this.userRating = user[i].rating;
              }
            }
          }
        });
      } else {
        this.trackRating = 'No ratings yet';
      }
    },
    error => {
      this.error = error;
    });
  }

  getSpotifySong(trackID: string) {
    let obs: Observable<any> = this.http.get('http://localhost:3000/getSong/' + trackID, this.requestOptions);
    obs.subscribe(
      response => {
        if (JSON.parse(response).error) {
          this.error = JSON.parse(response).error.status;
        } else {
          this.track = JSON.parse(response);
        }
      },
      error => {
        this.error = error;
      }
    );
  }

}
