import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';
import { PermissionGuard } from './guard/permission.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    data: { title: 'Início' },
    canActivate: [AuthGuard]
  }, {
    path: 'influencers',
    loadChildren: () => import('./pages/influencers/influencers.module').then(m => m.InfluencersPageModule),
    data: { title: 'Lista de Influencers', id: 'influencers' },
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'postagem',
    loadChildren: () => import('./pages/postagem/postagem.module').then(m => m.PostagemPageModule),
    data: { title: 'Lista de Postagem' },
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),

  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./pages/password-recovery/password-recovery.module').then(m => m.PasswordRecoveryPageModule),
    data: { title: 'Recuperação de senha' }
  },
  {
    path: 'password-recovery/:id',
    loadChildren: () => import('./pages/password-recovery/password-recovery.module').then(m => m.PasswordRecoveryPageModule),
    data: { title: 'Nova Senha' }
  },
  {
    path: 'signup/:id',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'influencers-modal',
    loadChildren: () => import('./pages/influencers-modal/influencers-modal.module').then(m => m.InfluencersModalPageModule),

  },
  {
    path: 'choose-type',
    loadChildren: () => import('./pages/choose-type/choose-type.module').then(m => m.ChooseTypePageModule)
  },
  {
    path: 'postagem-modal',
    loadChildren: () => import('./pages/postagem-modal/postagem-modal.module').then(m => m.PostagemModalPageModule),
    data: { title: 'Postagem' },
    canActivate: [AuthGuard]
  },
  {
    path: 'companys',
    loadChildren: () => import('./pages/companys/companys.module').then( m => m.CompanysPageModule),
    data: { title: 'Empresas', id:'companys' },
    canActivate: [AuthGuard, PermissionGuard]
  },

  { path: '**', redirectTo: '/home' },







];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AuthGuard, PermissionGuard],
  exports: [RouterModule],

})
export class AppRoutingModule { }
