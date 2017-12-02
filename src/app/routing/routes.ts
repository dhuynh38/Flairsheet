import { Routes } from '@angular/router';

import { MainComponent } from '../main/main.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
