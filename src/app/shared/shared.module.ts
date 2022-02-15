import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostagemComponent } from '../components/postagem/postagem.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';




@NgModule({
  imports: [CommonModule, MatFormFieldModule,
    MatInputModule,  NgxMaskModule.forRoot(),],
  declarations: [PostagemComponent],
  exports: [
    CommonModule, PostagemComponent
  ]
})
export class SharedModule { }
