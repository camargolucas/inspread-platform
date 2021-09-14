import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InfluencersModalPage } from '../pages/influencers-modal/influencers-modal.page';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  headers;
  requestOptions
  constructor(private modal:ModalController, private router:Router, private http:HttpClient) {

   }


   private setHeader(){
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders (headerDict), 
    };

    return requestOptions
   }


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



  getInfluencers(){

    return this.http.get('https://app.id.tec.br/influenciador/listar', this.setHeader()).subscribe(ret =>{
      console.log(ret)
    }, error =>{
      console.log(error)
    })

  }
}
