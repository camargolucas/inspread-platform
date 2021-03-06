import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfluencersPageRoutingModule } from './influencers-routing.module';

import { InfluencersPage } from './influencers.page';
import { HeaderPageModule } from 'src/app/components/header/header.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfluencersPageRoutingModule,
    HeaderPageModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [InfluencersPage]
})
export class InfluencersPageModule {}
