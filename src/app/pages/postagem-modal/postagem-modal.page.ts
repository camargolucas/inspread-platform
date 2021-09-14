import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-postagem-modal',
  templateUrl: './postagem-modal.page.html',
  styleUrls: ['./postagem-modal.page.scss'],
})
export class PostagemModalPage implements OnInit {
  @ViewChild('fileInput') uploadElRef: ElementRef

  constructor(public _DomSanitizationService: DomSanitizer) { }
  selectedFile;
  uploadedImages = []

  ngOnInit() {
  }

  removeImage(id){
    console.log(id);
    const index = this.uploadedImages.findIndex(img =>{
      return img.id == id
    })
    
    this.uploadedImages.splice(index, 1);
  }


  onFileChanged(event) {
    this.selectedFile = event.target
    Array.from(this.selectedFile.files).forEach((element, index) => {
      let image = URL.createObjectURL(element)
      let imageId = new Date().getTime() + index;

      let objImage = {
        tempImage : image,
        id: imageId
      }
    
      this.uploadedImages.push(objImage)
      this.uploadElRef.nativeElement.value = ''
    });

       

  }
  

}
