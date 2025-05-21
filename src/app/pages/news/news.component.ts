import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import {CardUtils} from '../../utils/card.utils';
import {NewsService} from '../../services/news.service';
import {News} from '../../models/News.class';
import {CardComponent} from '../../components/card/card.component';
import {Button} from 'primeng/button';
import {Carousel} from 'primeng/carousel';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    CardComponent,
    Button,
    Carousel
  ],
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit {

  constructor(
    private service: NewsService,
    public cardUtils: CardUtils,
  ) {}

  news: News[] = [];

  limit:number = 2;

  ngOnInit(): void {
    this.loadNews();
  }

  loadMore() {
    this.limit += 2;
    this.loadNews();
  }

  loadNews() {
    this.service.fetchNews(null,this.limit,null).subscribe({
      next: (news:News[]) => {
        this.news = news;
        console.log(this.news);
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }
}
