import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', title: 'Smart Restaurant POS',
    loadComponent: () =>import('./layouts/shell/shell').then((m) => m.Shell),
     children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard',
              },
              {
                path: 'dashboard', title: 'Dashboard',
                loadComponent: () =>import('./features/orders/orders').then((m) => m.Orders),
              },
              {
                path: 'kitchen', title: 'Kitchen Monitor',
                loadComponent: () => import('./features/kitchen/kitchen').then((m) => m.Kitchen),
              },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
