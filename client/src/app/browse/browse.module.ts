import { NgModule } from '@angular/core';
import { BrowseComponent } from './browse.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BrowseComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    BrowseComponent,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: []
})
export class BrowseModule { }
