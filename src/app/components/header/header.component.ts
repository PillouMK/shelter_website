import {Component, OnInit, HostListener } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import {RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import {AutoCompleteCompleteEvent, AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';
import {TestimonyService} from '../../services/testimony.service';
import {NewsService} from '../../services/news.service';
import {News} from '../../models/News.class';
import {Testimony} from '../../models/Testimony.class';
import {CardUtils} from '../../utils/card.utils';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule,
    RouterLink,
    CommonModule,
    AutoCompleteModule,
    FormsModule,
  ]
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[] | undefined;
  scrollPosition = 0;
  scrollToBottom = false;

  constructor(
    private newsService: NewsService,
    private testimonyService: TestimonyService,
    private cardUtils: CardUtils,
  ) {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const position = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (position > this.scrollPosition) {
      this.scrollToBottom = true;
    } else {
      this.scrollToBottom = false;
    }
    this.scrollPosition = position;
  }

  ngOnInit() {
    this.menuItems = [
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
      // {
      //   label: 'A propos',
      //   routerLink: '/about'
      // },
      {
        label: 'Contact',
        routerLink: '/contact'
      }
    ]
  }

  quitQuickly() {
    window.location.href = 'about:blank';
  }

  items: any[] = [];

  value: any;

  search(event: AutoCompleteCompleteEvent) {
    this.items = [];

    this.newsService.fetchNews(null, 0, event.query).subscribe({
      next: (news: News[]) => {
        this.items = [...this.items, ...news];
        this.testimonyService.fetchTestimonies(null, null, event.query).subscribe({
          next: (testimonies: Testimony[]) => {
            this.items = [...this.items, ...testimonies];
          },
          error: (err: any) => {
            console.error('Error fetching testimonies:', err);
          }
        });
      },
      error: (err: any) => {
        console.error('Error fetching news:', err);
      }
    });
  }

  goToArticle(event: any) {
    if(event.value instanceof News){
      this.cardUtils.goToId(event.value.id,'news')
    }
    else{
      this.cardUtils.goToId(event.value.id,'testimonies')
    }
    this.value = "";
  }
}
