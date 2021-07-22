import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostagemModalPage } from './postagem-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PostagemModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostagemModalPageRoutingModule {}
