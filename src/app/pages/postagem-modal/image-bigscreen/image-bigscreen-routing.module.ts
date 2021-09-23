import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageBigscreenPage } from './image-bigscreen.page';

const routes: Routes = [
  {
    path: '',
    component: ImageBigscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageBigscreenPageRoutingModule {}
