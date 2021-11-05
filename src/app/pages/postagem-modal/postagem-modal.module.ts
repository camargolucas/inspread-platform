import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostagemModalPageRoutingModule } from './postagem-modal-routing.module';

import { PostagemModalPage } from './postagem-modal.page';
import { HeaderPageModule } from 'src/app/components/header/header.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostagemModalPageRoutingModule,
    HeaderPageModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [PostagemModalPage]
})
export class PostagemModalPageModule {}
