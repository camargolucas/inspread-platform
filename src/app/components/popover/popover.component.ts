import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PopoverController } from '@ionic/angular';
import { TypeUser } from 'src/app/interface/typeUser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(public user:UserService, private popover:PopoverController, public _DomSanitizationService: DomSanitizer) { }

  ngOnInit() {
    this.getUserName()
  }

 

  goToUser(){
    const user = this.user.getUserStorage()
    this.user.openModalUser(user)
    this.popover.dismiss()
  }

  userName:string = "Nome"
  getUserName(){
    const user = this.user.getUserStorage()
    if (Object.keys(user).length > 0 ){
    
      this.userName = user[user['descTipoUsuario'].toLowerCase()]['nome']

    }
  }

  leave(){
    this.user.logout();
    this.popover.dismiss()
  }

}
