import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private user:UserService) { }


  loadedUser() {
    try {
      const user = JSON.parse(window.localStorage.getItem('user'))

      return user ? true : false;
    } catch (error) {
      console.error(error)
    }
  }


  cantAccessThisPage(pageId){
    try {
      const permissionsToExclude = this.user.pagesToRemoveWithoutPermission
      return permissionsToExclude.includes(pageId)
    } catch (error) {
      console.log('can get user', error)
    }
  }
}
