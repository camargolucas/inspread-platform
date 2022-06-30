import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import { HomePage } from './home.page';
import { HeaderPageModule } from 'src/app/components/header/header.module';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderPageModule,
    MatExpansionModule,
    MatDialogModule

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
