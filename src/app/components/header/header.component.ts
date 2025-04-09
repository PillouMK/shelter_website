import {Component, OnInit, HostListener } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import {RouterLink} from '@angular/router';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {NgClass} from '@angular/common';

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
    NgClass,
  ]
})
export class HeaderComponent implements OnInit  {

  items: MenuItem[] | undefined;
  scrollPosition = 0;
  scrollToBottom = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const position = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (position > this.scrollPosition) {
      this.scrollToBottom = true;
    }
    else{
      this.scrollToBottom = false;
    }
    this.scrollPosition = position;
  }

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
