import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentService } from 'src/app/services/environment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup
  formBuilder = new FormBuilder()
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
      {
        error: 'missMatch',
        msg: '*Os emails não coincidem',
      },
    ],
    cnpj: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
      { error: 'minlength', msg: '*Tamanho do CNPJ inválido' }

    ],
    confirmPassword: [
      {
        error: 'required',
        msg: '*Campo obrigatório',
      },
      {
        error: 'missMatch',
        msg: '*As senhas não coincidem',
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
      { error: 'minlength', msg: '*Tamanho de telefone inválido' }
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
      this.form = this.formBuilder.group({
        nome: new FormControl('', [Validators.required]),
        telefone: new FormControl('', [Validators.required, Validators.minLength(11)]),
        quantidadeSeguidores: new FormControl(0, [Validators.required]),
        linkRedeSocial: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        confirmEmail: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      }, {
        validators: [this.checkIfMatch('password', 'confirmPassword'), this.checkIfMatch('email', 'confirmEmail')]
      });
    } else {
      this.form = this.formBuilder.group({
        nome: new FormControl('', [Validators.required]),
        telefone: new FormControl('', [Validators.required, Validators.minLength(11)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        confirmEmail: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
        cnpj: new FormControl('', [Validators.required, Validators.minLength(11)])
      }, {
        validators: [this.checkIfMatch('password', 'confirmPassword'), this.checkIfMatch('email', 'confirmEmail')]
      }
      );
    }



  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.checkIfMatch('', '');
  }
  checkIfMatch(passwordKey: string, passwordConfirmationKey: string) {
    console.log('heyehyehe')
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ missMatch: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
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

  loading = false


  treatingApiReturnData(data) {
    if (data) {
      if (data['mensagemDeErro']){
        return 
      }
    }
  }

  signUp() {

    this.loading = true
    if (this.env.validateForm(this.form)) {
      if (this.type == 'Influencer') {
        this.user.signUpInfluencer(this.form.value).subscribe(ret => {
          this.loading = false
          if (ret['success']) {
            this.sucessSignUp()
          } else {
            this.popUp('Ops, Algo deu errado!', 'Houve um problema ao cadastrar o usuário!')
          }
        }, error => {
          this.loading = false
          console.error(error)
        }
        )
      } else {
        this.user.signUpEmpresa(this.form.value).subscribe(ret => {
          console.log('retorno', ret)
          this.loading = false
          if (ret['success']) {
            this.sucessSignUp()
          } else {
            this.popUp('Ops, Algo deu errado!', 'Houve um problema ao cadastrar o usuário!')
          }
        }, error => {
          this.loading = false
          console.error(error)
        })
      }
    } else {
      this.loading = false
      this.popUp('Campos inválidos!', 'Preencha todos os campos corretamente!')
    }
  }
}
