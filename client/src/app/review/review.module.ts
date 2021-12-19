import { NgModule } from '@angular/core';
import { ReviewComponent } from "./review.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { RatingService } from "../rating.service";
import { SessionService } from "../session.service";

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatButtonModule
  ],
  exports: [
    ReviewComponent,
    MatSliderModule,
    MatButtonModule
  ],
  providers: [
    RatingService,
    SessionService
  ]
})
export class ReviewModule { }
