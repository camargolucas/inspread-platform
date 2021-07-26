import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    data: {title: 'Início'}
  },   {
    path: 'influencers',
    loadChildren: () => import('./pages/influencers/influencers.module').then( m => m.InfluencersPageModule),
    data: {title: 'Lista de Influencers'}
  },
  {
    path: 'postagem',
    loadChildren: () => import('./pages/postagem/postagem.module').then( m => m.PostagemPageModule),
    data: {title: 'Lista de Postagem'}
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./pages/password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule),
    data: {title: 'Recuperação de senha'}
  },
  {
    path: 'password-recovery/:id',
    loadChildren: () => import('./pages/password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule),
    data: {title: 'Nova Senha'}
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'influencers-modal',
    loadChildren: () => import('./pages/influencers-modal/influencers-modal.module').then( m => m.InfluencersModalPageModule)
  },
  {
    path: 'postagem-modal',
    loadChildren: () => import('./pages/postagem-modal/postagem-modal.module').then( m => m.PostagemModalPageModule),
    data:{title:'Postagem'}
  },




 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
