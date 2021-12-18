import { NgModule } from '@angular/core';
import { ReviewComponent } from "./review.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { RatingService } from "../rating.service";
import { SessionService } from "../session.service";

@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ReviewComponent],
  providers: [
    RatingService,
    SessionService
  ]
})
export class ReviewModule { }
