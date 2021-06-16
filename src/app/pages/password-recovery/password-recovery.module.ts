import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordRecoveryPageRoutingModule } from './password-recovery-routing.module';

import { PasswordRecoveryPage } from './password-recovery.page';
import { HeaderPageModule } from 'src/app/components/header/header.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordRecoveryPageRoutingModule,
    HeaderPageModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [PasswordRecoveryPage]
})
export class PasswordRecoveryPageModule {}
