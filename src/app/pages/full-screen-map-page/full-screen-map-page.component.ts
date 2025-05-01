import {
  Component,
  inject,
  linkedSignal,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MarkersMapComponent } from '../../components/markers-map/markers-map.component';
import { MarkersService } from '../../services/markers.service';
import { PlusOnePipe } from '../../pipes/plus-one.pipe';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { DistanceKmPipe } from '../../pipes/distanceKm.pipe';
import { GoogleMapsLoaderService } from '../../services/google-maps-loader.service';
import { ShareButtonComponent } from "../../components/share-button/share-button.component";
import { PositionMapService } from '../../services/position-map.service';

@Component({
  selector: 'app-full-screen-map-page',
  imports: [
    GoogleMapsModule,
    PlusOnePipe,
    MarkersMapComponent,
    NavbarComponent,
    DistanceKmPipe,
    ShareButtonComponent
],
  templateUrl: './full-screen-map-page.component.html',
})
export class FullScreenMapPageComponent implements OnInit {
  markersService = inject(MarkersService);
  googleMapsLoader = inject(GoogleMapsLoaderService);
  positionMapService = inject(PositionMapService);
  private zoomChangedSubject = new Subject<void>();
private centerChangedSubject = new Subject<void>();

  ngOnInit(): void {
    this.googleMapsLoader.load().then(() => {
      this.mapLoaded.set(true);
    });

    this.zoomChangedSubject
    .pipe(debounceTime(3000)) // espera 300ms de inactividad
    .subscribe(() => {
      this.positionMapService.setZoomOnQueryParams(this.mapElement()?.getZoom() ?? 0);
    });

  this.centerChangedSubject
    .pipe(debounceTime(3000))
    .subscribe(() => {
      const center: google.maps.LatLngLiteral = {
        lat: this.mapElement()?.getCenter()?.lat() ?? 0,
        lng: this.mapElement()?.getCenter()?.lng() ?? 0,
      };
      this.positionMapService.setPositionOnQueryParams(center);
    });
  }
  // mapsApiKey = environment.mapsApiKey;
  mapElement = viewChild<GoogleMap>('map');
  zoom = linkedSignal<number>(() => this.positionMapService.zoom());
  mapLoaded = signal(false);

  center = linkedSignal<google.maps.LatLngLiteral>( () => this.positionMapService.centerPosition())


  options = signal<google.maps.MapOptions>({
    mapId: 'roadmap',
    colorScheme: 'DARK',
  });



  zoomChanged = () => {
    this.zoomChangedSubject.next();
  };;

  centerChanged() {
    this.centerChangedSubject.next();
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

  ngOnDestroy(): void {
    this.zoomChangedSubject.complete();
    this.centerChangedSubject.complete();
  }

}
