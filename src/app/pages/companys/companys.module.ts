import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanysPageRoutingModule } from './companys-routing.module';

import { CompanysPage } from './companys.page';
import { HeaderPageModule } from 'src/app/components/header/header.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanysPageRoutingModule,
    HeaderPageModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [CompanysPage]
})
export class CompanysPageModule {}
