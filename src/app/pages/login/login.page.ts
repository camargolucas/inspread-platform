import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { EnvironmentService } from 'src/app/services/environment.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

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
  constructor(private router: Router, public env: EnvironmentService, private loginService: LoginService, private user: UserService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.maxLength(40), Validators.email]),
      password: new FormControl('', [Validators.maxLength(16), Validators.minLength(5)]),
    });



  }

  getErrorMsg(error, control) {

    return this.env.getMessageError(this.errorMsg, error, control);
  }

  navigate(route) {
    setTimeout(() => {
      if (route == '/home') {
        this.router.navigate([`${route}`], { replaceUrl: true });
      } else {
        this.router.navigate([`${route}`]);
      }
    }, 300);

  }

  validateForm(form) {
    const keys = Object.keys(this.form.controls)
    if (form.status == 'VALID') return true

    return false
  }

  treatingReturnMessage(ret): string {
    if (ret['mensagem']) {
      return ret['mensagem']
    }

    return 'Houve um problema, tente novamente!'
  }

  loading = false;
  login() {
    let userObject = {

      login: this.form.controls['email'].value,
      senha: this.form.controls['password'].value
    }

    this.loading = true
    if (this.validateForm(this.form)) {

      this.loginService.login(userObject).subscribe(ret => {
        this.loading = false
        if (ret['success']) {
          this.user.setUserStorage(ret['response'])
          this.navigate('/home')

        } else {
          this.env.alert({
            header: 'Ops, algo deu errado',
            message: this.treatingReturnMessage(ret),
            buttons: ['OK']
          })
        }
      }, error => {
        this.loading = false
        console.error(error)
        this.env.alert({
          header: 'Ops, algo deu errado',
          message: 'Tente novamente !',
          buttons: ['OK']
        })
      })

      //this.navigate('/home')

    } else {
      this.loading = false
      this.env.alert({
        header: 'Ops, algo deu errado',
        message: 'Preencha corretamente os campos',
        buttons: ['OK']
      })

    }

  }

}
