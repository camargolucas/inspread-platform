import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageBigscreenPageRoutingModule } from './image-bigscreen-routing.module';

import { ImageBigscreenPage } from './image-bigscreen.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageBigscreenPageRoutingModule,

  ],
  declarations: [ImageBigscreenPage]
})
export class ImageBigscreenPageModule {}
