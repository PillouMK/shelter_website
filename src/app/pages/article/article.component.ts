import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import {Testimony} from '../../models/Testimony.class';
import {TestimonyService} from '../../services/testimony.service';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AudioPlayerComponent} from '../../components/audio-player/audio-player.component';
import { CarouselModule } from 'primeng/carousel';
import {CardComponent} from '../../components/card/card.component';
import {ArticleContentComponent} from '../../components/article-content/article-content.component';
import {CardUtils} from '../../utils/card.utils';
import {scrollToTop} from '../../utils/dom.utils'
import {News} from '../../models/News.class';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'app-article',
  imports: [
    PageHeaderComponent,
    CommonModule,
    AudioPlayerComponent,
    CarouselModule,
    CardComponent,
    ArticleContentComponent
  ],
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {

  @ViewChild('scrollTarget', { static: true }) scrollTarget!: ElementRef;
  article: News | Testimony | null = null;
  articles: News[] | Testimony[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1050px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private testimonyService:TestimonyService,
    private newsService: NewsService,
    public cardUtils: CardUtils,
  ) {}

  getAudioUrl(article: any): string  {
    if (article instanceof Testimony) {
      if(article.audio_url){
        return article.audio_url;
      }
      return '';
    }
    return ''
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const testimonyId = params['testimonyId'];
      const newsId = params['newsId'];
      scrollToTop();
      if(testimonyId){
        this.loadTestimony(testimonyId);
      }
      else{
        this.loadNews(newsId);
      }
    });
  }

  changeCard(cardId: string) {
    scrollToTop();
    this.cardUtils.goToId(cardId, this.article instanceof Testimony ? 'testimonies' : 'news');
  }


  loadTestimony(id:string) {
    this.testimonyService.getTestimonyById(id).subscribe({
      next: (testimony:Testimony | null) => {
        this.article = testimony;
        this.loadTestimonies(id);
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

  loadNews(id:string) {
    this.newsService.getNewsById(id).subscribe({
      next: (news:News | null) => {
        this.article = news;
        this.loadAllNews(id);
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

  loadTestimonies(id:string) {
    if(this.article instanceof Testimony){
      const type = this.article?.audio_url ? 'audio': 'text';
      this.testimonyService.fetchTestimonies(id,type).subscribe({
        next: (testimony:Testimony[]) => {
          this.articles = testimony;
        },
        error: (e: any) => {
          console.log(e);
        }
      });
    }
  }

  loadAllNews(id:string) {
    this.newsService.fetchNews(id,0).subscribe({
      next: (news:News[]) => {
        this.articles = news;
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }
}
