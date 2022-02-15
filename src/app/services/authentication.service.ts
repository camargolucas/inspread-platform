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
      const user = this.user.getUserStorage()

      const typeUser = user['descTipoUsuario'].toLowerCase()
      const pages = this.user.arrMenus[typeUser]

      const pagesUserId = pages.map(page => {
        return page.id
      })

      return pagesUserId.includes(pageId)
    } catch (error) {
      console.log('can get user', error)
    }
  }
}
