import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { BrowseComponent } from "./browse/browse.component";
import { ReviewComponent } from "./review/review.component";
import { NotFoundComponent } from "./not-found/not-found.component";

// Defines what component should be inserted depending on the url path
const routes: Routes = [
  { path: '', redirectTo: '/browse', pathMatch: 'full' },
  // Uncomment to view the example component made at the start of the project
  // { path: 'home', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'review/:trackID', component: ReviewComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
