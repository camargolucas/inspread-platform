import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostagemComponent } from '../components/postagem/postagem.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';
import { IonicModule } from '@ionic/angular';
import { ImageBigscreenPageModule } from '../pages/postagem-modal/image-bigscreen/image-bigscreen.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  imports: [CommonModule, MatFormFieldModule,
    MatInputModule,  NgxMaskModule.forRoot(),
    IonicModule.forRoot(),
    ImageBigscreenPageModule, FormsModule],
  declarations: [PostagemComponent],
  exports: [
    CommonModule, PostagemComponent
  ]
})
export class SharedModule { }
