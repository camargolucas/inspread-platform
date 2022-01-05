import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TypeUser } from 'src/app/interface/typeUser';
import { UserService } from 'src/app/services/user.service';
import { InfluencersModalPage } from '../influencers-modal/influencers-modal.page';

@Component({
  selector: 'app-influencers',
  templateUrl: './influencers.page.html',
  styleUrls: ['./influencers.page.scss'],
})
export class InfluencersPage implements OnInit {

  influencers
  filteredInfluencers
   /*  {
      nome:'Isabel Ferreira dos Santos',     
      quantidadeSeguidores:'12222',
      telefone:'22222222',     
      aceitaPermuta: true   
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
    } */
  

  constructor(private modal:ModalController, private userService:UserService) { }

  ngOnInit() {
    this.userService.getInfluencers().subscribe(ret =>{
      
      this.influencers = ret;
      this.filteredInfluencers = ret;
  
      
    },
    error => {
      console.error(error)
    });
    //this.filteredInfluencers = this.influencers

    
  }



  filter(event){
    const wordToFilter = event.target.value
    if(wordToFilter != null){
      this.filteredInfluencers = this.influencers.filter(influencer =>{
        return influencer.nome.toLowerCase().includes(wordToFilter.toLowerCase())
      })
    }
  }

  async openDetails(influenciador){

    const customObj = {
      idTipoUsuario:TypeUser.Influenciador,
      influenciador


    }
    const modal = await this.modal.create({
      component:InfluencersModalPage,
      componentProps: {
        influencer:customObj,
        isEditMode: false,
        isVisualizationMode: true
      },
      cssClass: 'influencer-modal'
    })
   return await modal.present();
  }
}
