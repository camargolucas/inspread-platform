import { Component, Input, OnInit, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { TypeUser } from 'src/app/interface/typeUser';
@Component({
  selector: 'app-influencers-modal',
  templateUrl: './influencers-modal.page.html',
  styleUrls: ['./influencers-modal.page.scss'],
})
export class InfluencersModalPage implements OnInit {
  @Input() userObjectDB
  @Input() isEditMode



  stepperOrientation: Observable<StepperOrientation>;
  porcSeguidores = 0;
  states = [
    'São Paulo'
  ]
  firstStateValue = 'São Paulo'
  secondStateValue = 'São Paulo'

  publicContent = [
    { checked: false, name: 'Homens' },
    { checked: false, name: 'Lazer' },
    { checked: false, name: 'Mulher' },
    { checked: false, name: 'Alimentação' },
    { checked: false, name: 'Adolescentes' },
    { checked: false, name: 'Empreendedorismo' },
    { checked: false, name: 'Crianças' },
    { checked: false, name: 'Beleza' },
    { checked: false, name: 'Atletas' },
    { checked: false, name: 'Saúde e bem-estar' },
    { checked: false, name: 'Decoração' },
    { checked: false, name: 'Artigos para casa' },
    { checked: false, name: 'Noivas' },
    { checked: false, name: 'Moda' },
    { checked: false, name: 'Outra Opção' }
  ]


  typeUser: number
  userPersonalFormGroup: any;
  accountDataFormGroup: any;
  addressFormGroup: any;
  bankDataFormGroup: any;

  constructor(private _formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver, private router: Router, private modal: ModalController, public _DomSanitizationService: DomSanitizer,
    public user: UserService) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));


  }



  createFormGroup() {
    if (this.getTypeUser() == TypeUser.Influenciador) {
      this.userPersonalFormGroup = this._formBuilder.group({
        nome: ['', Validators.required],
        idade: [''],
        tag: [''],
        telefone: ['', Validators.required],
        genero: [''],
        quantidadeSeguidores: ['', Validators.required],
        email: ['', Validators.required],
        cpf: ['']
      });
    } else {
      this.userPersonalFormGroup = this._formBuilder.group({
        nome: ['', Validators.required],
        telefone: ['', Validators.required],
        email: ['', Validators.required],
        cnpj: ['']
      });
    }

    this.accountDataFormGroup = this._formBuilder.group({
      porcSeguidoresMulheres: ['',],
      permuta: ['',],
      firstState: ['',],
      secondState: ['',],

    });
    this.addressFormGroup = this._formBuilder.group({
      cep: ['',],
      rua: ['',],
      bairro: ['',],
      numero: ['',],
      complemento: ['',],
      estado: ['',],
      cidade: ['',]
    });
    this.bankDataFormGroup = this._formBuilder.group({
      banco: ['',],
      contaCorrente: ['',],
      agencia: ['',],
      nomeFavorecido: ['',],
      cpfFavorecido: ['',],
    });
  }

  userData: any
  ngOnInit() {
    this.createFormGroup()
    this.populateUserData()
    this.typeUser = this.getTypeUser()

    this.populate()
    console.log(this.userObjectDB)
    this.visualizationMode()

  }


  populateUserData() {

    const typeUser = this.userObjectDB['descTipoUsuario'].toLowerCase()
    this.userData = this.userObjectDB[typeUser]
    console.log(this.userData)
  }


  verifyTypeUser(type) {
    return this.typeUser === Number(this.getEnum(type))
  }

  getEnum(type) {
    return TypeUser[type]
  }

  getTypeUser(): number {

    return this.userObjectDB['idTipoUsuario']

  }

  visualizationMode() {
    /* this.isEditMode */
    if (false) {
      this.userPersonalFormGroup.enable()
      this.accountDataFormGroup.enable()
      this.addressFormGroup.enable()
      this.bankDataFormGroup.enable()
    } else {
      this.userPersonalFormGroup.disable()
      this.accountDataFormGroup.disable()
      this.addressFormGroup.disable()
      this.bankDataFormGroup.disable()
    }
  }

  populate() {

    Object.keys(this.userPersonalFormGroup.controls).forEach(element => {
      this.userPersonalFormGroup.controls[element].setValue(this.userData[element])
    });

    if (TypeUser.Influenciador == this.getTypeUser()) {
      this.populateEnderecos()
    }



  }


  populateEnderecos() {

    Object.keys(this.addressFormGroup.controls).forEach(element => {
      if (this.userData['influenciadorEnderecos'][0] && this.userData['influenciadorEnderecos'][0][element]) {
        this.addressFormGroup.controls[element].setValue(this.userData['influenciadorEnderecos'][0][element])
      }

    });

  }

  back() {

    this.modal.dismiss()
  }

  selectedFile
  onFileChanged(event, type) {
    const file = event.target.files[0]
    this.user.profileImage = URL.createObjectURL(file)

  }

  concatForms(): Object {
    let concatedFormsGroups = {
      ...this.userPersonalFormGroup.value,
      ...this.accountDataFormGroup.value,
      InfluenciadorDadosBancarios: {
        ...this.bankDataFormGroup.value
      }
    }

    return concatedFormsGroups
  }

  save() {
    const payload = this.concatForms()
    this.user.updateUser(payload, '').subscribe(ret => {
      console.log(ret)
    })

  }

}
