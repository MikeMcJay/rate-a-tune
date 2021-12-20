import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  createUserSession() {
    // Set the uid in the browser's session
    localStorage.setItem('uid', uuid.v4());
  }

  getUserSession() {
    // Return the uid from the browser's session
    return localStorage.getItem('uid');
  }

  removeUserSession() {
    // Remove the uid from the browser's session
    localStorage.removeItem('uid');
  }

  doesSessionExist() {
    // Return's the existence of a uid field from the browser's session
    return !!localStorage.getItem('uid');
  }
}
