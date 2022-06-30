import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient, private api:ApiService) { }

  setHeader(){
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
}
