import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostagemPageRoutingModule } from './postagem-routing.module';

import { PostagemPage } from './postagem.page';
import { HeaderPageModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostagemPageRoutingModule,
    HeaderPageModule
  ],
  declarations: [PostagemPage]
})
export class PostagemPageModule {}
