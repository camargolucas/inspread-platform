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


  login(user:Object){
    
    return this.http.post('https://api.id.tec.br/Usuario/login',JSON.stringify(user),this.setHeader())
  }
}
