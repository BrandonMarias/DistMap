import { Component } from '@angular/core';

@Component({
  selector: 'share-button',
  imports: [],
  templateUrl: './share-button.component.html',
})
export class ShareButtonComponent {
  shareUrl() {
    if (navigator.share) {
      navigator
        .share({
          title: 'Comparte este enlace',
          text: 'Mira este enlace interesante',
          url: window.location.href,
        })
        .then(() => console.log('Enlace compartido'))
        .catch((error) => console.error('Error al compartir', error));
    } else {
      alert('La función de compartir no está disponible en este navegador.');
    }
  }
}
