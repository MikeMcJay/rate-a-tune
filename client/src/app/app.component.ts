import { Component } from '@angular/core';
import {SessionService} from "./session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(public session: SessionService) {
    // Create the user session on creation
    if (!session.doesSessionExist()) {
      session.createUserSession();
    }
    console.log('Current User UID: ' + session.getUserSession());
  }
}
