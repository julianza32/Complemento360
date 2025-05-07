import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user-list',
    loadComponent: () =>
      import('./pages/user-list/user-list.component').then((m) => m.UserListComponent),
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import('./pages/user/user.component').then((m) => m.UserComponent),
  },
  {
    path: 'new-user',
    loadComponent: () =>
      import('./pages/new-user/new-user.component').then((m) => m.NewUserComponent),
  },
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent) }
];