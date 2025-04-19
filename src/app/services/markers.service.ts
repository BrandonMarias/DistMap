import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MarkersService {

  constructor() {
    const markerPositions = localStorage.getItem('markerPositions');
    if (markerPositions) {
      this.markerPositions.set(JSON.parse(markerPositions));
    }
  }

  private markerPositions = signal<google.maps.LatLngLiteral[]>([]);

  saveMarkerPositions = effect(() => {
    localStorage.setItem('markerPositions', JSON.stringify(this.markerPositions()));
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
}
