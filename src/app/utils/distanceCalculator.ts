export class DistanceCalculator {
  public static calculateDistanceBetweenMarkers = (
    distance1: google.maps.LatLngLiteral,
    distance2: google.maps.LatLngLiteral
  ): number => {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    // Convertir grados a radianes
    const radLat1 = (distance1.lat * Math.PI) / 180;
    const radLat2 = (distance2.lat * Math.PI) / 180;
    const radLng1 = (distance1.lng * Math.PI) / 180;
    const radLng2 = (distance2.lng * Math.PI) / 180;

    // Diferencia de longitudes
    const deltaLng = radLng2 - radLng1;

    const a =
      Math.sin((radLat2 - radLat1) / 2) ** 2 +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = earthRadius * c;

    return distanceKm;
  }

  public static getDistanceBetweenMarkersList = (
    coordinates: google.maps.LatLngLiteral[]
  ): number => {
    if (coordinates.length < 2) {
      return 0;
    }
    let totalDistance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const distance = this.calculateDistanceBetweenMarkers(
        coordinates[i],
        coordinates[i + 1]
      );
      totalDistance += distance;
    }
    return totalDistance;
  }
}