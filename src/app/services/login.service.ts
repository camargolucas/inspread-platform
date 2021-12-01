import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

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

  signIn(){
    const body = {
      login: 'user@teste.com',
      senha:'123'
    }


    this.http.post('https://app.id.tec.br/usuario/listar', JSON.stringify(body),  this.setHeader()).subscribe(ret =>{
      console.log(ret)
    }, error => {
      console.log(error)
    })
  }

  login(user:Object){
    
    return this.http.post('https://api.id.tec.br/Usuario/login',JSON.stringify(user),this.setHeader())
  }
}
