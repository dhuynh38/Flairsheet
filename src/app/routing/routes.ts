import { Routes } from '@angular/router';

import { SignupComponent } from '../signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: SignupComponent
  }
];
