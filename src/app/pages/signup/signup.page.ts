import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentService } from 'src/app/services/environment.service';
import { UserService } from 'src/app/services/user.service';

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
    cnpj: [
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
    nome: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
    ],
    telefone: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
    ],
    quantidadeSeguidores: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
    ],
    linkRedeSocial: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
    ],
  };
  type: string = 'Influencer'
  constructor(public env: EnvironmentService, private router: Router, private user: UserService) { }

  ngOnInit() {
    this.type = this.checkUrlTypeInfluencer() ? 'Influencer' : 'Empresa'

    if (this.type == 'Influencer') {
      this.form = new FormGroup({
        nome: new FormControl('', [Validators.required]),
        telefone: new FormControl('', [Validators.required]),
        quantidadeSeguidores: new FormControl(0, [Validators.required]),
        linkRedeSocial: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        confirmEmail: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      });
    } else {
      this.form = new FormGroup({
        nome: new FormControl('', [Validators.required]),
        telefone: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        confirmEmail: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
        cnpj: new FormControl('', [Validators.required])
      });
    }



  }

  getErrorMsg(error, control) {
    return this.env.getMessageError(this.errorMsg, error, control);
  }

  checkUrlTypeInfluencer() {
    return this.router.url.toString().toLocaleLowerCase().includes('influencer')
  }

  popUp(header: string, messsage: string) {
    this.env.alert({
      header: header,
      message: messsage,
      buttons: ['OK']
    })

  }

  sucessSignUp() {
    this.form.reset();
    this.popUp('Cadastrado!', 'Usuário cadastrado com sucesso!')
    this.router.navigate([`/login`], { replaceUrl: true });
  }

  signUp() {

    if (this.env.validateForm(this.form)) {
      if (this.type == 'Influencer') {
        this.user.signUpInfluencer(this.form.value).subscribe(ret => {
          if (ret) {
            this.sucessSignUp()
          } else {
            this.popUp('Ops, Algo deu errado!', 'Houve um problema ao cadastrar o usuário!')
          }
        }
        )
      } else {
        this.user.signUpEmpresa(this.form.value).subscribe(ret => {
          if (ret) {
            this.sucessSignUp()
          } else {
            this.popUp('Ops, Algo deu errado!', 'Houve um problema ao cadastrar o usuário!')
          }
        })
      }
    } else {
      this.popUp('Campos inválidos!', 'Preencha todos os campos corretamente!')
    }
  }
}
