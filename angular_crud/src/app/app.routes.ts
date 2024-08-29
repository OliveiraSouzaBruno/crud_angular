import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: '**', // Navigate to Home Page if not found any page
    redirectTo: 'home',
  },
];
