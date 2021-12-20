import { NgModule } from '@angular/core';
import { ReviewComponent } from "./review.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { RatingService } from "../rating.service";
import { SessionService } from "../session.service";

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Title } from '@angular/platform-browser';

@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ReviewComponent,
    MatSliderModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    RatingService,
    SessionService,
    Title
  ]
})
export class ReviewModule { }
