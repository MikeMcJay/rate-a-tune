import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
