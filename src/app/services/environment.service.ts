import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }


  get isMobile(){
    return window.innerWidth <= 880;
  }

}
