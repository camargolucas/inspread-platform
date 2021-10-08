import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';
import { ImageBigscreenPage } from './image-bigscreen/image-bigscreen.page';

@Component({
  selector: 'app-postagem-modal',
  templateUrl: './postagem-modal.page.html',
  styleUrls: ['./postagem-modal.page.scss'],
})
export class PostagemModalPage implements OnInit {
  @ViewChild('fileInputStory') uploadElRef: ElementRef

  constructor(public _DomSanitizationService: DomSanitizer, private modal:ModalController, private alertController:AlertController) { }
  selectedFile;
  uploadedImagesFeed = []
  uploadedImagesStory = []
  uploadedImagesReels = []
  uploadedImages = {
    story: [],
    reels: [],
    feed:[]
  }
  
  types = ['story', 'reels', 'feed']

  ngOnInit() {
  }

  removeImage(id, type) {

    const index = this.uploadedImages[type].findIndex(img => {
      return img.id == id
    })

    this.uploadedImages[type].splice(index, 1);
  }

  async openModalImage(image){
    console.log(image)
    const modal = await this.modal.create({
      component: ImageBigscreenPage,
      componentProps: {
        data:image
      }
    })

    await modal.present()
  }

  save(){
    this.presentAlert()
    console.log(this.uploadedImages)
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Deseja finalizar?',
      message: 'Deseja salvar suas alteracoes?',
      buttons: [
        {
          text:'Sim',
          handler:() => {
            console.log('pressed YES')
          }
        },
        {
          text:'Não',
          handler:() => {
            console.log('pressed NO')
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  onFileChanged(event, type) {

    this.selectedFile = event.target
    Array.from(this.selectedFile.files).forEach((element, index) => {
      let image = URL.createObjectURL(element)
      let imageId = new Date().getTime() + index;

      let objImage = {
        tempImage: image,
        id: imageId,
        visualization: 0
      }
      console.log(type)
      this.uploadedImages[type].push(objImage)
     /*  if (type == 'story') {
        this.uploadedImagesStory.push(objImage)
      } else if (type == 'reels') {
        this.uploadedImagesReels.push(objImage)
      } else if (type == 'feed') {
        this.uploadedImagesFeed.push(objImage)
      } */

      //this.uploadElRef.nativeElement.value = ''
    });



  }


}
