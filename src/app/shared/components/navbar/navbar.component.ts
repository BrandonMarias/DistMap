import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  router = inject(Router);

  /**
   * Get the routes without the wildcard route
   */
  routes = routes.map((route) => ({
    name: route.title,
    path: route.path,
  })).filter((route) => route.path !== '**');


  /**
   * @returns The title of the current route
   */
  pageTitle = toSignal(this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map((event) => event.urlAfterRedirects),
    map((url) => this.routes.find((route) => `/${route.path}` === url)?.name),
  ))
}
