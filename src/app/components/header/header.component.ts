import {Component, OnInit} from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import {RouterLink} from '@angular/router';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule,
    RouterLink,
    IconField,
    InputIcon,
    InputText,
  ]
})
export class HeaderComponent implements OnInit  {

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Accueil',
        routerLink: '/'
      },
      {
        label: 'Actualités',
        routerLink: '/news'
      },
      {
        label: 'Témoignages',
        routerLink: '/testimonies'
      },
      {
        label: 'Aides',
        routerLink: '/help'
      },
      {
        label: 'A propos',
        routerLink: '/about'
      }
    ]
  }
}
