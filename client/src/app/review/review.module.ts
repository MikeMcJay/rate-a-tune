import { NgModule } from '@angular/core';
import { ReviewComponent } from "./review.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ReviewComponent]
})
export class ReviewModule { }
