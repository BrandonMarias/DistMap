import { Component, input, signal } from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
@Component({
  selector: 'mini-map',
  imports: [GoogleMapsModule],
  templateUrl: './mini-map.component.html',
})
export class MiniMapComponent {
  zoom = signal(14);

  center = input.required<google.maps.LatLngLiteral>();

  options = signal<google.maps.MapOptions>({
    mapId: 'roadmap',
    colorScheme: 'DARK',
    disableDefaultUI: true,
    headingInteractionEnabled: false,
  });
}
