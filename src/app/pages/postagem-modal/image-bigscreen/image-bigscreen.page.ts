import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-bigscreen',
  templateUrl: './image-bigscreen.page.html',
  styleUrls: ['./image-bigscreen.page.scss'],
})
export class ImageBigscreenPage implements OnInit {

  @Input() data;
  constructor(public _DomSanitizationService:DomSanitizer) {
    
   }

  ngOnInit() {
    console.log(this.data)
    //
  }

}
