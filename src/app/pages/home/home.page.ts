import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InfluencersModalPage } from '../influencers-modal/influencers-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private route:Router, private modal:ModalController) { }

  async goToUser(url){
   
      const modal = await this.modal.create({
      component:InfluencersModalPage,
      componentProps: {
        influencer:"influecer",
        isEditMode: true,
        isVisualizationMode: false
      },
      cssClass: 'influencer-modal'
    })

    return await modal.present();

  }

  goToPostagem(){
    this.route.navigate(['/postagem'])
  }

  ngOnInit() {
  }

}
