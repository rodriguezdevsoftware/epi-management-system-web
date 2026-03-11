import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [authGuard]
  },

  {
    path: 'registrations/positions',
    loadChildren: () =>
      import('./modules/registrations/positions/positions.module').then(m => m.PositionsModule),
    canActivate: [authGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }