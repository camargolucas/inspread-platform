import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EnvironmentService } from 'src/app/services/environment.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
    password: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },   
      { error: 'minlength', msg: '*Tamanho da senha inválido' },
      { error: 'maxlength', msg: '*Tamanho da senha inválido' },
    ],
  };

  form: FormGroup;
  constructor(private router: Router, public env: EnvironmentService, private loginService:LoginService) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.maxLength(40), Validators.email]),
      password: new FormControl('',[Validators.maxLength(16), Validators.minLength(5)]),
    });



  }

  getErrorMsg(error, control) {
   
    return this.env.getMessageError(this.errorMsg, error, control);
  }

  navigate(route) {
    console.log(route)
    if (route == '/home') {
      this.router.navigate([`${route}`], { replaceUrl: true });
    } else {
      this.router.navigate([`${route}`]);
    }
  }

  validateForm(form){
    const keys = Object.keys(this.form.controls)
     if (form.status == 'VALID') return true 
     
     return false
  }

  setUserStorage(user){
    localStorage.setItem('user', JSON.stringify(user))
  }

  

  login(){
    let userObject = {
    
      login: this.form.controls['email'].value,
      senha: this.form.controls['password'].value
    }
   
    if(this.validateForm(this.form)){

      this.loginService.login(userObject).subscribe(ret => {      
        console.log(ret)  
        if(ret['mensagemDeErro']){
          this.env.alert({
            header:'Ops, algo deu errado',
            message: ret['mensagemDeErro'],
            buttons:['OK']
          })
        }else if (ret['idUsuario']){
          this.navigate('/home')
          this.setUserStorage(ret)
        }else{
          this.env.alert({
            header:'Ops, algo deu errado',
            message: 'Houve um problema, tente novamente',
            buttons:['OK']
          })
        }
      })
  
      
    
      //this.navigate('/home')
     
    }else{
    
      this.env.alert({
        header:'Ops, algo deu errado',
        message:'Preencha corretamente os campos',
        buttons:['OK']
      })
      
    }
    
  }

}
