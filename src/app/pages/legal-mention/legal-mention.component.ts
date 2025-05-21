import { Component } from '@angular/core';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-legal-mention',
  imports: [
    MarkdownComponent
  ],
  templateUrl: './legal-mention.component.html',
})
export class LegalMentionComponent {

  content: string = `
    ## Éditeur du site
    Nom : She'lter</br>
    Adresse : 20 Boulevard Charles de Gaule</br>
    E-mail : shelteradf44@gmail.com</br>
    Association loi 1901, n° RNA : W123456789</br>
    Responsable de la publication : She'lter</br>

    ## Hébergement
    Nom de l’hébergeur :</br>
    Adresse :</br>
    Téléphone :</br>

    ## Données personnelles
    Les données collectées via le formulaire de contact ne sont utilisées que pour répondre aux messages. Conformément au RGPD, vous pouvez exercer vos droits d'accès, de rectification ou de suppression en nous contactant à l'adresse : shelteradf44@gmail.com

    ## Cookies
    Ce site n'utilise aucun cookies.
  `;

}
