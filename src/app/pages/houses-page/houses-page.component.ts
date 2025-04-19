import { Component, inject, signal } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { CurrencyPipe } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { PlusOnePipe } from '../../pipes/plus-one.pipe';
import { FullScreenMapPageComponent } from "../full-screen-map-page/full-screen-map-page.component";
import { MiniMapComponent } from "../../components/mini-map/mini-map.component";

@Component({
  selector: 'app-houses-page',
  imports: [CurrencyPipe, GoogleMapsModule, MiniMapComponent],
  templateUrl: './houses-page.component.html',
})
export class HousesPageComponent {
  houseService = inject(HouseService);
}
