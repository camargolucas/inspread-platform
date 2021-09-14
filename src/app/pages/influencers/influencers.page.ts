import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { InfluencersModalPage } from '../influencers-modal/influencers-modal.page';

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.page.html',
  styleUrls: ['./influencers.page.scss'],
})
export class InfluencersPage implements OnInit {

  influencers = [
    {
      nome:'Isabel Ferreira dos Santos',
      tag:'@joellma',
      telefone:'22222222',
      genero:'Feminino',
      idade: '25',
      uf: 'SP'
    },
    {
      nome:'Larissa Ribeiro',
      tag:'@joellma',
      telefone:'114412431',
      genero:'Feminino',
      idade: '25',
      uf: 'SP'
    },
    {
      nome:'Isabel Ferreira dos Santos',
      tag:'@joellma',
      telefone:'114412431',
      genero:'Feminino',
      idade: '25',
      uf: 'SP'
    }
  ]

  constructor(private modal:ModalController, private userService:UserService) { }

  ngOnInit() {
    this.userService.getInfluencers();
  }



  async openDetails(influecer){
    const modal = await this.modal.create({
      component:InfluencersModalPage,
      componentProps: {
        influencer:influecer
      },
      cssClass: 'influencer-modal'
    })
   return await modal.present();
  }
}
