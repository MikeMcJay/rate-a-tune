import { NgModule } from '@angular/core';
import { BrowseComponent } from './browse.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Title } from '@angular/platform-browser';

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
  providers: [Title]
})
export class BrowseModule { }
