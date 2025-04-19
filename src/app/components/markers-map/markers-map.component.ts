import { Component, inject, input, output } from '@angular/core';
import { MarkersService } from '../../services/markers.service';
import { DecimalPipe } from '@angular/common';
import { PlusOnePipe } from '../../pipes/plus-one.pipe';

@Component({
  selector: 'markers-map',
  imports: [DecimalPipe, PlusOnePipe],
  templateUrl: './markers-map.component.html',
})
export class MarkersMapComponent {
  markers = input.required<google.maps.LatLngLiteral[]>();
  markSelected = output<number>();
  removeMarker = output<number>();
  removeAllMarkers = output<void>();
}
