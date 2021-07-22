import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostagemPageRoutingModule } from './postagem-routing.module';

import { PostagemPage } from './postagem.page';
import { HeaderPageModule } from 'src/app/components/header/header.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostagemPageRoutingModule,
    HeaderPageModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [PostagemPage]
})
export class PostagemPageModule {}
