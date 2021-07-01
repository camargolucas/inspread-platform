import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfluencersModalPage } from './influencers-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InfluencersModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfluencersModalPageRoutingModule {}
