export interface HouseProperty {
  id: string;
  name: string;
  description: string;
  price: number;
  lngLat: google.maps.LatLngLiteral;
  tags: string[];
}