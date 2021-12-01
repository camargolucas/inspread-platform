import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PopoverController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(public user:UserService, private popover:PopoverController, public _DomSanitizationService: DomSanitizer) { }

  ngOnInit() {}

 

  goToUser(){
    const user = this.user.getUserStorage()
    this.user.openModalUser(user)
    this.popover.dismiss()
  }

  leave(){
    this.user.logout();
    this.popover.dismiss()
  }

}
