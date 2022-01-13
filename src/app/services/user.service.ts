import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InfluencersModalPage } from '../pages/influencers-modal/influencers-modal.page';

import { TypeUser } from '../interface/typeUser';


@Injectable({
  providedIn: 'root',
})


export class UserService {

  headers;
  requestOptions;
  profileImage = "/assets/images/user-profile.png"
  typeUser: TypeUser
  constructor(
    private modal: ModalController,
    private router: Router,
    private http: HttpClient,

  ) {

  }


  pagesToRemoveWithoutPermission = [

  ]


  influencerMenuToRemove = [
    'influencers'
  ]



  private setHeader() {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return requestOptions;
  }



  removeMenuPermission() {
    const user = this.getUserStorage()
    if (Object.keys(user).length > 0) {
      if (user['idTipoUsuario'] == TypeUser.Influenciador) {
        this.pagesToRemoveWithoutPermission.push('influencers')
      }
    }
  }

  async openModalUser(user?: Object) {  
    if (Object.keys(user).length > 0) {
      const modal = await this.modal.create({
        component: InfluencersModalPage,
        componentProps: {
          influencer: user,
          isEditMode: true,        
        },
        cssClass: 'influencer-modal',
      });

      return await modal.present();
    }

  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  getInfluencers() {
    return this.http
      .get('https://api.id.tec.br/influenciador/listar'
      );
  }

  getUserStorage(): Object {
    try {
      let user = {}
      user = JSON.parse(localStorage.getItem('user'))
      if (Object.keys(user).length > 0) {
        return user
      }

      return {}



    } catch (error) {
      console.error('erro ao pegar usuariuo', error)
    }
  }

  /*  name: new FormControl('', [Validators.required]),
        tel: new FormControl('', [Validators.required]),
        quantidadeSeguidores: new FormControl('', [Validators.required]),
        linkRedeSocial: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        confirmEmail: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]), */

  signUpInfluencer(user) {

    const objUser = {
      "usuario": {
        "login": user['email'],
        "senha": user['password']
      }
    }
    user['usuario'] = objUser['usuario']


    return this.http.post('https://api.id.tec.br/Influenciador/cadastrar', JSON.stringify(user), this.setHeader())
  }

  signUpEmpresa(user) {

    const objUser = {
      "razaoSocial": user['nome'],
      "usuario": {
        "login": user['email'],
        "senha": user['password']
      }
    }
    user['usuario'] = objUser['usuario']
    user['razaoSocial'] = objUser['razaoSocial']

    return this.http.post('https://api.id.tec.br/empresa/cadastrar', JSON.stringify(user), this.setHeader())
  }





}
