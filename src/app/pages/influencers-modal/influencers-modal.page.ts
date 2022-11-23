import { Component, Inject, Input, OnInit, Type } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { TypeUser } from 'src/app/interface/typeUser';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-influencers-modal',
  templateUrl: './influencers-modal.page.html',
  styleUrls: ['./influencers-modal.page.scss'],
})
export class InfluencersModalPage implements OnInit {
  @Input() userObjectDB
  @Input() isEditMode


  PROFILE_IMAGE_WIDTH = 500;
  PROFILE_IMAGE_HEIGTH = 500;

  PROFILE_IMAGE_QUALITY = 0.75;

  stepperOrientation: Observable<StepperOrientation>;
  porcSeguidores = 0;
  states = [
    'São Paulo'
  ]
  firstStateValue = 'São Paulo'
  secondStateValue = 'São Paulo'

  publicContent = [
    /*   { checked: false, name: 'Homens' },
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
      { checked: false, name: 'Outra Opção' } */
  ]


  typeUser: number
  bind
  publicContentFormGroup: FormGroup
  userPersonalFormGroup: FormGroup;
  accountDataFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  bankDataFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver, private router: Router, private modal: ModalController, private alertController: AlertController, public _DomSanitizationService: DomSanitizer,
    public userService: UserService, private api: ApiService, private toast: ToastController, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InfluencersModalPage>) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));


  }

  getUserPublicContent() {
    try {

      if (this.userData && Object.keys(this.userData).length > 0) {
        this.publicContent = this.userData['segmentosConteudo']

      }

    } catch (error) {



    }

  }

  /*   createPublicContentFormGroup() {
      this.publicContentFormGroup = this._formBuilder.group({
        "Homens": false,
        "Lazer": false,
        "Mulher": false,
        "Alimentação": false,   
        "Adolescentes": false,
        "Empreendedorismo": false,
        "Crianças": false,
        "Beleza": false,
        "Atletas": false,
        "Saúde e bem - estar": false,
        "Decoração": false,
        "Artigos para casa": false,
        "Noivas": false,
        "Moda": false,
        "Outra Opção": false
      });
  
  } */


  createFormGroup() {
    if (this.getTypeUserId() == TypeUser.Influenciador) {
      this.userPersonalFormGroup = this._formBuilder.group({
        nome: ['', Validators.required],
        idade: [0],
        linkRedeSocial: [''],
        telefone: [null, Validators.required],
        genero: [''],
        quantidadeSeguidores: [0, Validators.required],
        email: ['', Validators.required],
        cpf: ['']
      });
    } else {
      this.userPersonalFormGroup = this._formBuilder.group({
        nome: ['', Validators.required],
        telefone: [null, Validators.required],
        email: ['', Validators.required],
        cnpj: ['']
      });
    }

    this.accountDataFormGroup = this._formBuilder.group({
      porcentagemSeguidoresMulheres: [0,],
      aceitaPermulta: [false,],
      primeiraCidadeSeguidores: ['',],
      primeiraCidadeSeguidoresUF: [''],
      segundaCidadeSeguidoresUF: [''],
      segundaCidadeSeguidores: ['',],
      facebook: [''],
      instagram: [''],
      linkedIn: [''],
      pinterest: ['']

    });
    this.addressFormGroup = this._formBuilder.group({
      cep: [null,],
      rua: [null,],
      bairro: [null,],
      numero: [null,],
      complemento: [null,],
      estado: [null,],
      cidade: [null,]
    });
    this.bankDataFormGroup = this._formBuilder.group({
      banco: [null,],
      contaCorrente: [null,],
      agencia: [null,],
      nomeFavorecido: [null,],
      cpfFavorecido: [null,],
    });



    this.firstStateFormControl()
    this.secondStateFormControl()
    this.stateFormControl()
  }

  userData: any
  ngOnInit() {
    this.userObjectDB = this.data['userObjectDB']
    this.isEditMode = this.data['isEditMode']
    this.createFormGroup()
    this.getUserData()
    this.typeUser = this.getTypeUserId()

    this.populateFields()
    this.visualizationMode()
    this.getStateStorage()


  }




  firstStateFormControl() {
    this.firstDistrictsArray = []
    this.accountDataFormGroup.controls['primeiraCidadeSeguidoresUF'].valueChanges.subscribe(state => {
      if (state && Object.keys(state).length > 0) {
        this.getDistrict(state).subscribe((states: []) => {
          this.firstDistrictsArray = states
        })

      }

    })
  }

  secondDistrictsArray = []
  secondStateFormControl() {
    this.secondDistrictsArray = []
    this.accountDataFormGroup.controls['segundaCidadeSeguidoresUF'].valueChanges.subscribe(state => {
      if (state && Object.keys(state).length > 0) {
        this.getDistrict(state).subscribe((states: []) => {
          this.secondDistrictsArray = states
        })
      }
    })
  }

  districts = []
  stateFormControl() {
    this.districts = []
    this.addressFormGroup.controls['estado'].valueChanges.subscribe(state => {
      if (state && Object.keys(state).length > 0) {
        this.getDistrict(state).subscribe((states: []) => {
          this.districts = states
        })
      }
    })
  }

  setStateStorage(states) {
    try {
      localStorage.setItem("states", JSON.stringify(states))
    } catch (error) {

    }
  }

  statesArray = []
  getStateStorage() {
    try {
      const states = JSON.parse(localStorage.getItem("states"))
      if (states) {
        this.statesArray = states;
      } else {
        this.getStates()
      }
    } catch (error) {

    }
  }

  getStates() {
    this.api.getStates().subscribe((states: []) => {
      this.setStateStorage(states)
      this.statesArray = states
    }, error => {
      console.error(error)
    })
  }

  firstDistrictsArray = []

  getDistrict(UF) {

    return this.api.getDistrict(UF)
  }




  getUserData() {

    const typeUser = this.userObjectDB['descTipoUsuario'].toLowerCase()
    this.userData = this.userObjectDB[typeUser]

  }


  verifyTypeUser(type) {
    return this.typeUser === Number(this.getEnum(type))
  }

  getEnum(type) {
    return TypeUser[type]
  }

  getTypeUserId(): number {

    return this.userObjectDB['idTipoUsuario']

  }

  getTypeUser(): string {
    return this.userObjectDB['descTipoUsuario'].toLowerCase();
  }

  visualizationMode() {

    if (this.isEditMode) {
      this.enableFields()
    } else {
      this.disableFields()
    }
  }

  disableFields() {
    this.userPersonalFormGroup.disable()
    this.accountDataFormGroup.disable()
    this.addressFormGroup.disable()
    this.bankDataFormGroup.disable()
  }

  enableFields() {
    this.userPersonalFormGroup.enable()
    this.accountDataFormGroup.enable()
    this.addressFormGroup.enable()
    this.bankDataFormGroup.enable()
  }


  populateFields() {

    Object.keys(this.userPersonalFormGroup.controls).forEach(element => {
      this.userPersonalFormGroup.controls[element].setValue(this.userData[element])
    });

    if (TypeUser.Influenciador == this.getTypeUserId()) {

      this.populateEnderecos()
      this.populateDadosBancarios()
      this.populateDadosEmpresariais()
      this.getUserPublicContent();
    }
  }




  /*   async presentAlertConfirm() {
      const alert = await this.alertController.create({
        header: 'Confirmação!',
        message: 'Deseja <strong>salvar</strong> as alterações do seu perfil?',
        cssClass:"",
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
  
            handler: (blah) => {
  
            }
          }, {
            text: 'Confirmar',
            handler: () => {
            
            }
          }
        ]
      });
  
      await alert.present();
    } */


  populateDadosEmpresariais() {


    try {
      Object.keys(this.accountDataFormGroup.controls).forEach(element => {
        if (this.userData['influenciadorDadosEmpresariais'][0] && this.userData['influenciadorDadosEmpresariais'][0][element]) {
          this.accountDataFormGroup.controls[element].setValue(this.userData['influenciadorDadosEmpresariais'][0][element])
        }

      });
    } catch (error) {
      console.error(error)
    }
  }

  populateDadosBancarios() {

    try {
      Object.keys(this.bankDataFormGroup.controls).forEach(element => {
        if (this.userData['influenciadorDadosBancarios'][0] && this.userData['influenciadorDadosBancarios'][0][element]) {
          this.bankDataFormGroup.controls[element].setValue(this.userData['influenciadorDadosBancarios'][0][element])
        }

      });
    } catch (error) {
      console.error(error)
    }
  }

  populateEnderecos() {

    try {
      Object.keys(this.addressFormGroup.controls).forEach(element => {
        if (this.userData['influenciadorEnderecos'][0] && this.userData['influenciadorEnderecos'][0][element]) {
          this.addressFormGroup.controls[element].setValue(this.userData['influenciadorEnderecos'][0][element])
        }

      });
    } catch (error) {
      console.error(error)
    }
  }

  back() {

    this.dialogRef.close()
  }

  selectedFile
  onFileChanged(event, type) {
    const file: File = event.target.files[0];
    this.userService.profileImage = URL.createObjectURL(file);
    this.selectedFile = file;
  }

  async uploadImage(idUsuario: number) {

    if (this.selectedFile) {
      await this.uploadImageService(this.selectedFile, idUsuario).toPromise()
        .catch(err => console.log(err));
    }
  }

  uploadImageService(imgProfile, idInfluenciador) {

    return this.userService.uploadImgPerfil(imgProfile, idInfluenciador)

  }

  concatForms(): Object {


    let concatedFormsGroups = {
      ...this.userPersonalFormGroup.value,

      InfluenciadorDadosBancarios: {
        ...this.bankDataFormGroup.value
      },
      InfluenciadorDadosEmpresariais: {
        ...this.accountDataFormGroup.value,
      },
      InfluenciadorEnderecos: {
        ...this.addressFormGroup.value
      },
      SegmentosConteudo: [
        ...this.publicContent
      ],
    }

    return concatedFormsGroups
  }

  setSaveLoading(bool) {
    if (bool == true) {
      this.disableFields()
    } else {
      this.enableFields()
    }
    this.savingLoading = bool
  }


  mountUserToUpdateInStorage(userObjectToUpdate) {
    this.userObjectDB[this.getTypeUser()] = userObjectToUpdate;

    return this.userObjectDB

  }

  async successSave(msg, userObjectToUpdate) {

    const updatedUser = this.mountUserToUpdateInStorage(userObjectToUpdate);

    this.userService.updateUserStorage(updatedUser)
    this.presentAlert(msg)

    console.log('returning value', updatedUser)
    this.dialogRef.close(updatedUser)


  }


  async presentAlert(msg) {
    const alert = await this.toast.create({
      message: msg,
      buttons: ['Fechar'],
      duration: 2000
    });
    await alert.present();
  }

  savingLoading = false;
  async save() {
    try {


      const descrTipoUsuario = this.userObjectDB['descTipoUsuario']
      const idUsuario = this.userData[`id${descrTipoUsuario}`];
      let payload: Object = {}


      if (this.verifyTypeUser('Influenciador')) {
        payload = this.concatForms()
      } else {
        payload = {}
      }

      const userObject = {
        ...payload,
        [`id${descrTipoUsuario}`]: idUsuario
      }


      if (idUsuario) {
        this.setSaveLoading(true)
      
        await this.uploadImage(idUsuario);
        this.userService.updateUser(userObject).subscribe(async (ret) => {        
          setTimeout(() => {
            if (ret['success']) {
              this.successSave(ret['mensagem'], ret['response'])
            }
            this.setSaveLoading(false)
          }, 500);

        }, error => {
          this.setSaveLoading(false)
        })
      } else {
        this.presentAlert("Houve um problema ao salvar seu usuário, contactar o TI.")
      }
    } catch (error) {
      this.presentAlert("Houve um problema ao tentar salvar." + error)
      this.setSaveLoading(false)
      console.error(error)
    }

  }

}


