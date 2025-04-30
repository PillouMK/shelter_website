import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroSectionComponent} from '../../components/hero-section/hero-section.component';
import {News} from '../../models/News.class';
import {Testimony} from '../../models/Testimony.class';
import {TestimonyService} from '../../services/testimony.service';
import {NewsService} from '../../services/news.service';
import {CardUtils} from '../../utils/card.utils';
import {CardComponent} from '../../components/card/card.component';
import {Carousel} from 'primeng/carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [CommonModule, HeroSectionComponent, CardComponent, Carousel]
})
export class HomeComponent implements OnInit {

  articles: (News | Testimony)[] = [];
  news: News[] = [];
  testimonies: Testimony[] = [];

  constructor(
    private testimonyService: TestimonyService,
    private newsService: NewsService,
    public cardUtils: CardUtils,
  ) {}

  isNews(item:any): boolean {
    return item instanceof News;
  }

  ngOnInit(): void {
    this.loadTestimonies();
    this.loadAllNews();
  }

  responsiveOptions: any[] = [
    {
      breakpoint: '1050px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  loadTestimonies() {
    this.testimonyService.fetchTestimonies(null, null).subscribe({
      next: (testimonies: Testimony[]) => {
        this.testimonies = testimonies;
        this.mergeArticles();
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

  loadAllNews() {
    this.newsService.fetchNews(null, 0).subscribe({
      next: (news: News[]) => {
        this.news = news;
        this.mergeArticles();
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

  mergeArticles() {
    if (this.news.length === 0 || this.testimonies.length === 0) {
      return;
    }
    this.articles = [];
    const maxLength = Math.max(this.news.length, this.testimonies.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < this.news.length) {
        this.articles.push(this.news[i]);
      }
      if (i < this.testimonies.length) {
        this.articles.push(this.testimonies[i]);
      }
    }
  }
}
