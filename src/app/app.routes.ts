import { Routes } from '@angular/router';
import { FullScreenMapPageComponent } from './pages/full-screen-map-page/full-screen-map-page.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';

export const routes: Routes = [
  {
    path: 'full-screen-map',
    component: FullScreenMapPageComponent,
    title: 'Full Screen Map'
  },
  {
    path: 'houses',
    component: HousesPageComponent,
    title: 'Propiedades'
  },
  {
    path: '**',
    redirectTo: 'full-screen-map',
  }
];
