import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InfluencersModalPage } from '../pages/influencers-modal/influencers-modal.page';

import { TypeUser } from '../interface/typeUser';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ApiService } from './api.service';
import { MatDialog } from '@angular/material/dialog';
import { EnvironmentService } from './environment.service';


@Injectable({
  providedIn: 'root',
})


export class UserService {

  headers;
  requestOptions;
  profileImage = "/assets/images/user-profile.png"
  typeUser: TypeUser

  userObject: Object

  constructor(
    private modal: ModalController,
    private router: Router,
    private http: HttpClient,
    private api: ApiService,
    public dialog: MatDialog,
    public env:EnvironmentService

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


  openModalUser(user:Object, isEditMode = true) {   
    const dialogRef = this.dialog.open(InfluencersModalPage, {
      data: {
        userObjectDB: user,
        isEditMode: isEditMode,
      },
      width: this.env.isMobile ? "100%" : "800px",
      height: this.env.isMobile ? "100%" : "670px",
      panelClass: "modal-user"
    });

    return dialogRef.afterClosed()
  }

  async openModalUser1(user?: Object, isEditMode = true) {
    if (Object.keys(user).length > 0) {
      const modal = await this.modal.create({
        component: InfluencersModalPage,
        componentProps: {
          userObjectDB: user,
          isEditMode: isEditMode,

        },
        mode:'ios',
        cssClass: 'influencer-modal',
      });

      modal.present();

      return modal.onDidDismiss()
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
          .get(`${'https://api.id.tec.br'}/influenciador/listar`);
      }))

  }

  async setUserStorage(user) {
    this.userObject = {}
    await localStorage.setItem('user', JSON.stringify(user))
    this.userObject = user;
  
    this.menuUserControl()
  }

  updateUserStorage(userDataToUpdate) {
    try {

      let user = this.getUserStorage()

      if (user && Object.keys(user).length > 0) {
        if (userDataToUpdate && Object.keys(userDataToUpdate).length > 0) {

          this.setUserStorage(userDataToUpdate);
        }

      }


    } catch (error) {

    }
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
        return this.http.post(`${'https://api.id.tec.br'}/Influenciador/cadastrar`, JSON.stringify(user), this.setHeader())
      }))

  }


  updateUser(user: Object) {




    return this.api.getApiUrl().pipe(
      take(1),
      switchMap((url: string) => {
        return this.http.post(`${'https://api.id.tec.br'}/Influenciador/atualizar`, JSON.stringify(user), this.setHeader())
      })

    )

  }

}
