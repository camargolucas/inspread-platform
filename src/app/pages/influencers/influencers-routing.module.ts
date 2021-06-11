import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderPageModule } from 'src/app/components/header/header.module';

import { InfluencersPage } from './influencers.page';

const routes: Routes = [
  {
    path: '',
    component: InfluencersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfluencersPageRoutingModule {}
