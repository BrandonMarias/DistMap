import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceKm',
})
export class DistanceKmPipe implements PipeTransform {
  transform(value: number): string {
    if (value < 1 && value > 0) {
      return `${(value * 1000).toFixed(0)} m`;
    } else if (value >= 1) {
      return `${value.toFixed(2)} km`;
    } else {
      return '0 km';
    }
  }
}
