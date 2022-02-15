import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ImageBigscreenPage } from 'src/app/pages/postagem-modal/image-bigscreen/image-bigscreen.page';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.scss'],
})
export class PostagemComponent implements OnInit {


  @Input() type
  @Input() icon
  @Input() color

  selectedFile;
  uploadedImagesFeed = []
  uploadedImagesStory = []
  uploadedImagesReels = []
  uploadedImages = {
    story: [],
    reels: [],
    feed: []
  }
  constructor(public _DomSanitizationService: DomSanitizer, private modal:ModalController) { }

  ngOnInit() {
    console.log(this.type)
  }

  click() {
    document.getElementById(`file-input-${this.type}`).click()
  }
  removeImage(id) {

    const index = this.uploadedImages[this.type].findIndex(img => {
      return img.id == id
    })

    this.uploadedImages[this.type].splice(index, 1);
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


  onFileChanged(event) {

    this.selectedFile = event.target
    Array.from(this.selectedFile.files).forEach((element, index) => {
      let image = URL.createObjectURL(element)
      let imageId = new Date().getTime() + index;

      let objImage = {
        tempImage: image,
        id: imageId,
        visualization: 0
      }

      this.uploadedImages[this.type].push(objImage)
    });



  }
}
