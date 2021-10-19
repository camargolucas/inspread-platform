import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }


  loadedUser() {
    try {
      const user = JSON.parse(window.localStorage.getItem('user'))

      return user ? true : false;
    } catch (error) {
      console.error(error)
    }
  }
}
