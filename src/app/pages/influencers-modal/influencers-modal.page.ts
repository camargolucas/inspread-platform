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
  @Input() influencer
  @Input() isEditMode
  @Input() isVisualizationMode


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
  firstFormGroup: any;
  secondFormGroup: any;
  thirdFormGroup: any;
  fourthFormGroup: any;

  constructor(private _formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver, private router: Router, private modal: ModalController, public _DomSanitizationService: DomSanitizer,
    public user: UserService) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
    

  }



  createFormGroup() {
    if (this.getTypeUser() == TypeUser.Influenciador) {
      this.firstFormGroup = this._formBuilder.group({
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
      this.firstFormGroup = this._formBuilder.group({
        razaoSocial: ['', Validators.required],
        telefone: ['', Validators.required],
        email: ['', Validators.required],
        cnpj: ['']
      });
    }

    this.secondFormGroup = this._formBuilder.group({
      porcSeguidoresMulheres: ['',],
      permuta: ['',],
      firstState: ['',],
      secondState: ['',],

    });
    this.thirdFormGroup = this._formBuilder.group({
      cep: ['',],
      rua: ['',],
      bairro: ['',],
      numero: ['',],
      complemento: ['',],
      estado: ['',],
      cidade: ['',]
    });
    this.fourthFormGroup = this._formBuilder.group({
      banco: ['',],
      contaCorrente: ['',],
      agencia: ['',],
      nome: ['',],
      cpf: ['',],
    });
  }

  userData: any
  ngOnInit() {
    this.createFormGroup()
    this.populateUserData()
    this.typeUser = this.getTypeUser()


    if (this.isEditMode || this.isVisualizationMode) {
      this.populate()
    }

    //this.visualizationMode()

  }


  populateUserData() {
    console.log(this.influencer)
    if (this.influencer['idTipoUsuario'] == TypeUser.Empresa) {
      this.userData = this.influencer['empresa']
    } else {
      this.userData = this.influencer['influenciador']
    }
  }


  verifyTypeUser(type){
    return this.typeUser === Number(this.getEnum(type)) 
  }

  getEnum(type) {
    return TypeUser[type]
  }

  getTypeUser(): number {
    
    return this.influencer['idTipoUsuario']

  }

  visualizationMode() {
    if (this.visualizationMode) {
      this.firstFormGroup.disable()
      this.secondFormGroup.disable()
      this.thirdFormGroup.disable()
    } else {
      this.firstFormGroup.enable()
      this.secondFormGroup.enable()
      this.thirdFormGroup.enable()
    }
  }

  populate() {
    console.log(this.userData['influenciadorEnderecos'])
    Object.keys(this.firstFormGroup.controls).forEach(element => {      
      this.firstFormGroup.controls[element].setValue(this.userData[element])
    });

    if(TypeUser.Influenciador == this.getTypeUser()){
      this.populateEnderecos()
    }
    

    this.firstFormGroup.controls['email'].setValue(this.influencer['login'])
  }


  populateEnderecos(){
    
    Object.keys(this.thirdFormGroup.controls).forEach(element => {
      if(this.userData['influenciadorEnderecos'][0] && this.userData['influenciadorEnderecos'][0][element]){
        this.thirdFormGroup.controls[element].setValue(this.userData['influenciadorEnderecos'][0][element])
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
    console.log(this.user.profileImage)
  }

}
