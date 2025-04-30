import {
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { MarkersMapComponent } from '../../components/markers-map/markers-map.component';
import { MarkersService } from '../../services/markers.service';
import { PlusOnePipe } from '../../pipes/plus-one.pipe';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { DistanceKmPipe } from '../../pipes/distanceKm.pipe';

@Component({
  selector: 'app-full-screen-map-page',
  imports: [
    GoogleMapsModule,
    PlusOnePipe,
    MarkersMapComponent,
    NavbarComponent,
    DistanceKmPipe
],
  templateUrl: './full-screen-map-page.component.html',
})
export class FullScreenMapPageComponent {
  markersService = inject(MarkersService);
  // mapsApiKey = environment.mapsApiKey;
  mapElement = viewChild<GoogleMap>('map');
  zoom = signal(14);

  center = signal<google.maps.LatLngLiteral>({
    lat: 18.920206978089375,
    lng: -99.19595662660282,
  });

  currentCenter = signal<google.maps.LatLngLiteral>(this.center());

  options = signal<google.maps.MapOptions>({
    mapId: 'roadmap',
    colorScheme: 'DARK',
  });

  zoomChanged = () => {
    this.zoom.set(this.mapElement()?.getZoom() ?? 0);
  };

  centerChanged() {
    const center: google.maps.LatLngLiteral = {
      lat: this.mapElement()?.getCenter()?.lat() ?? 0,
      lng: this.mapElement()?.getCenter()?.lng() ?? 0,
    };
    this.currentCenter.set(center);
  }

  handleClick(event: google.maps.MapMouseEvent) {
    this.markersService.addMarkerPosition(
      event.latLng?.toJSON() ?? { lat: 0, lng: 0 },
    );
  }

  handleDragEnd($event: google.maps.MapMouseEvent, index: number) {
    this.markersService.updateMarkerPosition(
      index,
      $event.latLng?.toJSON() ?? { lat: 0, lng: 0 },
    );
  }

  handleMarkSelected(index: number) {
    const marker = this.markersService.getMarkerPositions()[index];
    this.center.set(marker);
    this.zoom.set(18);
  }

  handleRemoveMarker(index: number) {
    console.log('removeMarker', index);
    this.markersService.removeMarkerPosition(index);
  }

  handleRemoveAllMarkers() {
    this.markersService.removeAllMarkerPositions();
  }

}
