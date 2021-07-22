import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder ,Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-influencers-modal',
  templateUrl: './influencers-modal.page.html',
  styleUrls: ['./influencers-modal.page.scss'],
})
export class InfluencersModalPage implements OnInit {
  @Input() influencer

  firstFormGroup = this._formBuilder.group({
    nome: ['', Validators.required],
    idade: ['', Validators.required],
    tag: ['', Validators.required],
    telefone: ['', Validators.required],
    genero: ['', Validators.required],
    qtdSeguidores: ['', Validators.required],
    email: ['', Validators.required],
    cpf: ['', Validators.required] 
  });
  secondFormGroup = this._formBuilder.group({
    porcSeguidoresMulheres: ['', Validators.required],
    permuta: ['', Validators.required],
    firstState: ['', Validators.required],
    secondState: ['', Validators.required],
    
  });
  thirdFormGroup = this._formBuilder.group({
    cep: ['', Validators.required],
    rua: ['', Validators.required],
    bairro: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: ['', Validators.required],
    estado: ['', Validators.required],
    cidade: ['', Validators.required]
  });
  fourthFormGroup = this._formBuilder.group({
    banco: ['', Validators.required],
    contaCorrente: ['', Validators.required],
    agencia: ['', Validators.required],
    nome: ['', Validators.required],
    cpf: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;
  porcSeguidores = 0;
  states = [
    'São Paulo'
  ]
  firstStateValue = 'São Paulo'
  secondStateValue = 'São Paulo'

  publicContent = [
    {checked:false, name:'Homens'},
    {checked:false, name:'Lazer'},
    {checked:false, name:'Mulher'},
    {checked:false, name:'Alimentação'},
    {checked:false, name:'Adolescentes'},
    {checked:false, name:'Empreendedorismo'},
    {checked:false, name:'Crianças'},
    {checked:false, name:'Beleza'},
    {checked:false, name:'Atletas'},
    {checked:false, name:'Saúde e bem-estar'},
    {checked:false, name:'Decoração'},
    {checked:false, name:'Artigos para casa'},
    {checked:false, name:'Noivas'},
    {checked:false, name:'Moda'},
    {checked:false, name:'Outra Opção'}
  ]
  
  constructor(private _formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver, private router:Router, private modal:ModalController) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
    .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
   }



  ngOnInit() {
    console.log(this.influencer)
  }

  back(){
    this.router.navigate(['/home'])
    this.modal.dismiss()
  }

}
