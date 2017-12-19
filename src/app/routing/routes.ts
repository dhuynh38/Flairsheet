import { Routes } from '@angular/router';

import { MainComponent } from '../main/main.component';
import { HomeComponent } from '../home/home.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

import { RedirectService } from '../services/redirect/redirect.service';

/**
 * Array containing all the routes of the front-end.
 */
export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [RedirectService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RedirectService]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
