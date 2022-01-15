import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TypeUser } from 'src/app/interface/typeUser';
import { UserService } from 'src/app/services/user.service';
import { InfluencersModalPage } from '../influencers-modal/influencers-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private route: Router, private modal: ModalController, public _DomSanitizationService: DomSanitizer, public user: UserService) {

   }


   getUserName(){
     
     const typeUser = this.userObj['descTipoUsuario']
     return this.userObj[typeUser.toLowerCase()]['nome']
   }

   getUserEmail(){
    const user = this.userObj
    const typeUser = user['descTipoUsuario']
    return user[typeUser.toLowerCase()]['email']
   }

   getTypeUser(type:string){
     return TypeUser[type]
   }

  async goToUser(url) {
    const user = this.user.getUserStorage()
    this.user.openModalUser(user)

    
      
  }

  userObj: any
  getUserStorage() {
    try {
      this.userObj = JSON.parse(localStorage.getItem('user'))
    } catch (error) {
      console.error('erro ao pegar usuariuo', error)
    }
  }

  goToPostagem() {
    this.route.navigate(['/postagem'])
  }

  ngOnInit() {
    this.getUserStorage()
    this.user.removeMenuPermission()
  }

}
