import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }



  getApiUrl() {
    return of('/url-api')
  }


  getStates() {
    try {
      return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    } catch (error) {

    }
  }

  districtParams() {
    let params = new HttpParams();
    params.append('orderBy', "nome")
    params = params

    return params
  }

  getDistrict(UF: string) {
    const params = this.districtParams()


    return this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios?orderBy=nome`)
  }
}
