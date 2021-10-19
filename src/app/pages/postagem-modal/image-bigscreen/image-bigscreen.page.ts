import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-bigscreen',
  templateUrl: './image-bigscreen.page.html',
  styleUrls: ['./image-bigscreen.page.scss'],
})
export class ImageBigscreenPage implements OnInit {

  @Input() data;
  constructor(public _DomSanitizationService:DomSanitizer, public modalController:ModalController) {
    
   }

  ngOnInit() {
    console.log(this.data)
    //
  }

  dismiss(){
    this.modalController.dismiss()
  }

}
