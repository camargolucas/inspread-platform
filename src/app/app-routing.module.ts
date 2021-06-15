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

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
