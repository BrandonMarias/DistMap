import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DistanceCalculator } from '../utils/distanceCalculator';

@Injectable({
  providedIn: 'root',
})
export class MarkersService {
  router = inject(Router);

  constructor() {
    if (this.hasMArkersOnQueryParams()) {
     this.getMarkersFromQueryParams();
     return;
    }
    const markerPositions = localStorage.getItem('markerPositions');
    if (markerPositions) {
      this.markerPositions.set(JSON.parse(markerPositions));
    }
  }

  private markerPositions = signal<google.maps.LatLngLiteral[]>([]);

  saveMarkerPositions = effect(() => {
    localStorage.setItem(
      'markerPositions',
      JSON.stringify(this.markerPositions()),
    );
    this.setMarkersOnQueryParams();
  });

  getMarkerPositions() {
    return this.markerPositions();
  }

  addMarkerPosition(position: google.maps.LatLngLiteral) {
    this.markerPositions.update((positions) => [...positions, position]);
  }

  removeMarkerPosition(index: number) {
    this.markerPositions.update((positions) =>
      positions.filter((_, i) => i !== index),
    );
  }

  updateMarkerPosition(index: number, position: google.maps.LatLngLiteral) {
    this.markerPositions.update((positions) =>
      positions.map((p, i) => (i === index ? position : p)),
    );
  }

  removeAllMarkerPositions() {
    this.markerPositions.set([]);
  }

  distanceBetweenMarkers = computed<number>(() => {
    return DistanceCalculator.getDistanceBetweenMarkersList(this.markerPositions());
  })

  setMarkersOnQueryParams = () => {
    const markers = this.markerPositions();
    const markersString = markers
      .map((marker) => `${marker.lat},${marker.lng}`)
      .join('|');
    this.router.navigate([], {
      queryParams: { markers: markersString },
      queryParamsHandling: 'merge',
    });
  }

  getMarkersFromQueryParams = () => {
    const queryParams = this.router.routerState.snapshot.root.queryParams;
    const markersString = queryParams['markers'];
    if (markersString) {
      const markersArray = markersString.split('|').map((marker: string ) => {
        const [lat, lng] = marker.split(',');
        return { lat: parseFloat(lat), lng: parseFloat(lng) };
      });
      this.markerPositions.set(markersArray);
    }
  };

  hasMArkersOnQueryParams = () => {
    const queryParams = this.router.routerState.snapshot.root.queryParams;
    const markersString = queryParams['markers'];
    return markersString && markersString !== '';
  }
}
