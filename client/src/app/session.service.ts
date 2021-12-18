import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  createUserSession() {
    localStorage.setItem('uid', uuid.v4());
  }

  getUserSession() {
    return localStorage.getItem('uid');
  }

  removeUserSession() {
    localStorage.removeItem('uid');
  }

  doesSessionExist() {
    return !!localStorage.getItem('uid');
  }
}
