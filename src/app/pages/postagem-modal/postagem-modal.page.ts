import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, ModalController } from '@ionic/angular';
import { ImageBigscreenPage } from './image-bigscreen/image-bigscreen.page';


interface postData {
  type: string,
  icon: string,
  color: string,
}


@Component({
  selector: 'app-postagem-modal',
  templateUrl: './postagem-modal.page.html',
  styleUrls: ['./postagem-modal.page.scss'],
})
export class PostagemModalPage implements OnInit {
  @ViewChild('fileInputStory') uploadElRef: ElementRef

  constructor(public _DomSanitizationService: DomSanitizer, private modal: ModalController, private alertController: AlertController) { }
  selectedFile;
  uploadedImagesFeed = []
  uploadedImagesStory = []
  uploadedImagesReels = []
  uploadedImages = {
    story: [],
    reels: [],
    feed: []
  }

  types: Array<postData> = [
    { type: 'story', color: 'secondary', icon: '/assets/images/story-icon.svg' },
    { type: 'feed', color: 'primary', icon: '/assets/images/feed-icon.svg' },
    { type: 'reels', color: 'tertiary', icon: '/assets/images/reels-icon.svg' }
  ]


  /* 
  = [
    {type:'story', color:}, 
  'reels', 
  'feed']
 */
  ngOnInit() {
   
  }

  removeImage(id, type) {

    const index = this.uploadedImages[type].findIndex(img => {
      return img.id == id
    })

    this.uploadedImages[type].splice(index, 1);
  }

  async openModalImage(image) {

    const modal = await this.modal.create({
      component: ImageBigscreenPage,
      componentProps: {
        data: image
      }
    })

    await modal.present()
  }

  save() {
    this.presentAlert()

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Deseja finalizar?',
      message: 'Deseja salvar suas alteracoes?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {

          }
        },
        {
          text: 'Não',
          handler: () => {

          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

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
