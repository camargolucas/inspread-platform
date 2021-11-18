import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseTypePageRoutingModule } from './choose-type-routing.module';

import { ChooseTypePage } from './choose-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseTypePageRoutingModule
  ],
  declarations: [ChooseTypePage]
})
export class ChooseTypePageModule {}
