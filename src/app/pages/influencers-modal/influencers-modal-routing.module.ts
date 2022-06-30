import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
