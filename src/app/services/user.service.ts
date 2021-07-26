import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InfluencersModalPage } from '../pages/influencers-modal/influencers-modal.page';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private modal:ModalController, private router:Router) { }


  async openModalUser(){
   
    const modal = await this.modal.create({
    component:InfluencersModalPage,
    componentProps: {
      influencer:"influecer"
    },
    cssClass: 'influencer-modal'
  })

  return await modal.present();

}



logout(){
  this.router.navigate(['/login'], {replaceUrl:true})
}
}
