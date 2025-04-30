import { Routes } from '@angular/router';
import { FullScreenMapPageComponent } from './pages/full-screen-map-page/full-screen-map-page.component';
import { HomePageComponent } from './pages/HomePage/HomePage.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Home'
  },
  {
    path: 'full-screen-map',
    component: FullScreenMapPageComponent,
    title: 'Full Screen Map'
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
