import { NgModule } from '@angular/core';
import { BrowseComponent } from './browse.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [BrowseComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [BrowseComponent]
})
export class BrowseModule { }
