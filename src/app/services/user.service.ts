import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InfluencersModalPage } from '../pages/influencers-modal/influencers-modal.page';

import { TypeUser } from '../interface/typeUser';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ApiService } from './api.service';


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
    private api: ApiService

  ) {

  }

  arrMenus = {
    influenciador: [
      { id: 'home', title: 'Ínicio', url: '/home', icon: '/assets/images/home-icon.svg' },
    ],
    empresa: [
      { id: 'home', title: 'Ínicio', url: '/home', icon: '/assets/images/home-icon.svg' },

      { id: 'influencers', title: 'Influencers', url: '/influencers', icon: '/assets/images/influencer-icon.svg' },
    ],
    administrador: [
      { id: 'home', title: 'Ínicio', url: '/home', icon: '/assets/images/home-icon.svg' },

      { id: 'influencers', title: 'Influencers', url: '/influencers', icon: '/assets/images/influencer-icon.svg' },

      { id: 'companys', title: 'Empresas', url: '/companys', icon: '/assets/images/company.svg' },
    ]

  }



  pagesToRemoveWithoutPermission = [

  ]



  influencerMenuToRemove = [
    'influenciador'
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

  menu = []
  menuUserControl() {
    try {

      const user = this.getUserStorage()
      const typeUser = user['descTipoUsuario'].toLowerCase();

      this.menu = this.arrMenus[typeUser]

    } catch (error) {

    }
  }

  removeMenuPermission() {
    const user = this.getUserStorage()
    if (Object.keys(user).length > 0) {
      if (user['idTipoUsuario'] == TypeUser.Influenciador) {
        this.pagesToRemoveWithoutPermission.push('influenciador')
      }
    }
  }

  async openModalUser(user?: Object,  isEditMode = true) {
    if (Object.keys(user).length > 0) {
      const modal = await this.modal.create({
        component: InfluencersModalPage,
        componentProps: {
          userObjectDB: user,
          isEditMode: isEditMode,
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
    return this.api.getApiUrl().pipe(
      take(1),
      switchMap((url: string) => {
        return this.http
        .get(`${url}/influenciador/listar`); 
      }))
   
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


  signUpInfluencer(user) {

    const objUser = {
      "usuario": {
        "login": user['email'],
        "senha": user['password']
      }
    }
    user['usuario'] = objUser['usuario']

    return this.api.getApiUrl().pipe(
      take(1),
      switchMap((url: string) => {
        return this.http.post(`${url}/Influenciador/cadastrar`, JSON.stringify(user), this.setHeader())     
      }))
    
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

    return this.api.getApiUrl().pipe(
      take(1),
      switchMap((url: string) => {
        return this.http.post(`${url}/empresa/cadastrar`, JSON.stringify(user), this.setHeader())
      }))

  }


  getCompanys() {

    return this.api.getApiUrl().pipe(
      take(1),
      switchMap((url: string) => {
        return this.http.get(`${url}/Empresa/listar`)
      }))

  }


  updateUser(user: Object, typeUser:string) {

    
    const userobj = {
      idInfluenciador: 31,
      ...user
    }

    return this.api.getApiUrl().pipe(
      take(1),
      switchMap((url: string) => {
        return this.http.post(`${url}/Influenciador/atualizar`, JSON.stringify(userobj), this.setHeader())
      })

    )

  }

}
