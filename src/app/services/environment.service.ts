import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(private alertCtrl:AlertController) { }


  get isMobile(){
    return window.innerWidth <= 880;
  }

  getMessageError(arr ,error, control) {
  
    let ret = '';

    arr[error].forEach(element => {
      let msg = control.hasError(element.error) ? element.msg : '';
      if (ret === '' && msg !== '') ret = msg;
    });
    return ret;
  }

  async alert(options){
    const alert = await this.alertCtrl.create(options)

    return await alert.present()
  }

  validateForm(form){
  
     if (form.status == 'VALID') return true 
     
     return false
  }


}
