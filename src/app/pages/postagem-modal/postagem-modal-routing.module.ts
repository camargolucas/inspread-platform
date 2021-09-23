import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostagemModalPage } from './postagem-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PostagemModalPage
  },  {
    path: 'image-bigscreen',
    loadChildren: () => import('./image-bigscreen/image-bigscreen.module').then( m => m.ImageBigscreenPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostagemModalPageRoutingModule {}
