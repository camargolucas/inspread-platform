import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseTypePage } from './choose-type.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseTypePageRoutingModule {}
