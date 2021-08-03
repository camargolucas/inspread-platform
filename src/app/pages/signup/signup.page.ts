import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup;

  errorMsg = {
    email: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
      { error: 'email', msg: '*Formato de email inválido' },
      { error: 'minlength', msg: '*Tamanho do Email inválido' },
      { error: 'maxlength', msg: '*Tamanho do Email inválido' },
    ],
    confirmEmail: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
    ],
    confirmPassword: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
    ],
    password: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
      { error: 'minlength', msg: '*Tamanho da senha inválido' },
      { error: 'maxlength', msg: '*Tamanho da senha inválido' },
    ],
    name: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
    ],
    tel: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
    ],
    qtFollowers: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
    ],
    linkSocialMedia: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
    ],
  };

  constructor(public env: EnvironmentService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      qtFollowers: new FormControl('', [Validators.required]),
      linkSocialMedia: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      confirmEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  getErrorMsg(error, control) {
    return this.env.getMessageError(this.errorMsg, error, control);
  }


  signUp(){

    if(this.env.validateForm(this.form)){
      console.log('done')
    }else{  
      console.log('deu ruim')
    }
  }
}
