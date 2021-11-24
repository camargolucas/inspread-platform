import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-influencers-modal',
  templateUrl: './influencers-modal.page.html',
  styleUrls: ['./influencers-modal.page.scss'],
})
export class InfluencersModalPage implements OnInit {
  @Input() influencer
  @Input() isEditMode
  @Input() isVisualizationMode

  firstFormGroup = this._formBuilder.group({
    nome: ['', Validators.required],
    idade: [''],
    tag: [''],
    telefone: ['', Validators.required],
    genero: [''],
    qtdSeguidores: ['', Validators.required],
    email: ['', Validators.required],
    cpf: ['']
  });
  secondFormGroup = this._formBuilder.group({
    porcSeguidoresMulheres: ['',],
    permuta: ['',],
    firstState: ['',],
    secondState: ['',],

  });
  thirdFormGroup = this._formBuilder.group({
    cep: ['',],
    rua: ['',],
    bairro: ['',],
    numero: ['',],
    complemento: ['',],
    estado: ['',],
    cidade: ['',]
  });
  fourthFormGroup = this._formBuilder.group({
    banco: ['',],
    contaCorrente: ['',],
    agencia: ['',],
    nome: ['',],
    cpf: ['',],
  });
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


  typeUser: string = 'Empresa'

  constructor(private _formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver, private router: Router, private modal: ModalController, public _DomSanitizationService: DomSanitizer,
    public user:UserService) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));

  }



  ngOnInit() {

    this.influencer = {
      nome: 'Jhennifer',
      email: 'Jhejhe@gmail.com',
      cpf: '40346922423',
      telefone: '11993124017',
      qtdSeguidores: '123'
    }

    if (this.isEditMode || this.isVisualizationMode) {
      this.populate()
    }

    //this.visualizationMode()

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
    Object.keys(this.firstFormGroup.controls).forEach(element => {
      this.firstFormGroup.controls[element].setValue(this.influencer[element])
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
