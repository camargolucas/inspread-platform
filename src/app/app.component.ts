import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentService } from './services/environment.service';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {



  sideMenu = 'end'

  hideMenu = [
    'login',
    'signup',
    'password-recovery',
    'choose-type'
  ]

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public router: Router, private activatedRoute: ActivatedRoute, public env: EnvironmentService, public user: UserService) {
    this.user.menuUserControl()
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //console.log(this.router.url.toString().split('/'))
    setTimeout(() => {

    }, 400);


  }
  get isLogin() {
    return this.router.url == "/login"
  }




  /* permissionControl(){
    const pagesToBlock = ['influencers']
    
    const index = this.appPages.findIndex(page =>{
      return page['url'].includes('influencers')
    })

    this.appPages.splice(index, 1)   
  }
 */

  logout() {
    this.user.logout()
  }


  openUserModal() {
    const user = this.user.getUserStorage()
    this.user.openModalUser(user);
  }



}
