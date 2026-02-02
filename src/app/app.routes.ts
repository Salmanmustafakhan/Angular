import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';

/**
 * Routes define URL -> Component mapping
 */
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Loads Home page at '/'
  },
  {
    path: 'users',
    component: UsersComponent, // Loads Users page at '/users'
  },
];
