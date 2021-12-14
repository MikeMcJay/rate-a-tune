import { NgModule } from '@angular/core';
import { BrowseComponent } from './browse.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { RatingService } from "../rating.service";

@NgModule({
  declarations: [BrowseComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [BrowseComponent],
  providers: [RatingService]
})
export class BrowseModule { }
