import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { HomeModule } from "./home/home.module";
import { BrowseModule } from "./browse/browse.module";
import { ReviewModule } from "./review/review.module";

import { FormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http';
import { SessionService } from "./session.service";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HomeModule,
    BrowseModule,
    ReviewModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
