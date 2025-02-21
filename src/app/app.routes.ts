import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
