import { computed, inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PositionMapService {
  router = inject(Router);
  activedRouter = inject(ActivatedRoute);

  constructor() {
    if (this.hasPositionOnQueryParams()) {
      this.getPositionFromQueryParams();
    } else {
      this.getPositionFromLocalStorage();
    }
    if (this.hasZoomOnQueryParams()) {
      this.getZoomFromQueryParams();
    } else {
      this.getZoomFromLocalStorage();
    }
  }

  private mapPosition = signal<google.maps.LatLngLiteral>({
    lat: 18.920206978089375,
    lng: -99.19595662660282,
  });

  centerPosition = computed(() => {
    return this.mapPosition();
  });

  setPositionOnQueryParams(position: google.maps.LatLngLiteral) {
    if (position) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('lat', position.lat.toString());
      queryParams.set('lng', position.lng.toString());
      this.router.navigate([], {
        queryParams: {
          lat: position.lat,
          lng: position.lng,
        },
        queryParamsHandling: 'merge',
      });
    }
  }
  getPositionFromQueryParams() {
    const queryParams = this.activedRouter.snapshot.queryParams;
    const lat = queryParams['lat'];
    const lng = queryParams['lng'];
    if (lat && lng) {
      this.mapPosition.set({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
    }
  }

  hasPositionOnQueryParams() {
    const queryParams = this.activedRouter.snapshot.queryParams;
    return queryParams['lat'] !== undefined && queryParams['lng'] !== undefined;
  }

  setPositionOnLocalStorage( position: google.maps.LatLngLiteral) {

      localStorage.setItem('mapPosition', JSON.stringify(position));
  }
  getPositionFromLocalStorage() {
    const position = localStorage.getItem('mapPosition') ?? '';
    if (position) {
      this.mapPosition.set(JSON.parse(position));
    }
  }

  setZoomOnLocalStorage( zoom: number) {
    localStorage.setItem('mapZoom', JSON.stringify(zoom));
  }
  getZoomFromLocalStorage() {
    const zoom = localStorage.getItem('mapZoom');
    if (zoom) {
      this.mapZoom.set(JSON.parse(zoom));
    }
  }

  // Set and get zoom level from local storage and query params
  /* zoom level */
  private mapZoom = signal<number>(14);

  zoom = computed(() => {
    return this.mapZoom();
  });

  setZoomOnQueryParams(zoom: number) {
    if (zoom) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('zoom', zoom.toString());
      this.router.navigate([], {
        queryParams: {
          zoom: zoom,
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  getZoomFromQueryParams() {
    const queryParams = this.activedRouter.snapshot.queryParams;
    const zoom = queryParams['zoom'];
    if (zoom) {
      this.mapZoom.set(parseInt(zoom, 10));
    }
  }

  hasZoomOnQueryParams() {
    const queryParams = this.activedRouter.snapshot.queryParams;
    return queryParams['zoom'] !== undefined;
  }
}
