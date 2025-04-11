import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import {Testimony} from '../../models/Testimony.class';
import {TestimonyService} from '../../services/testimony.service';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioPlayerComponent} from '../../components/audio-player/audio-player.component';
import { CarouselModule } from 'primeng/carousel';
import {CardComponent} from '../../components/card/card.component';
import {ArticleContentComponent} from '../../components/article-content/article-content.component';

@Component({
  selector: 'app-testimony',
  imports: [
    PageHeaderComponent,
    CommonModule,
    AudioPlayerComponent,
    CarouselModule,
    CardComponent,
    ArticleContentComponent
  ],
  templateUrl: './testimony.component.html'
})
export class TestimonyComponent implements OnInit {

  @ViewChild('scrollTarget', { static: true }) scrollTarget!: ElementRef;
  testimony: Testimony | null = null;
  testimonies: Testimony[] = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private service:TestimonyService,
    private router: Router,
  ) {}

  goToId(id:string) {
    this.router.navigate(['/testimonies', id]);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['testimonyId'];
      this.scrollToElementById('targetElementId');
      this.loadTestimony(id);
    });
  }

  scrollToElementById(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  loadTestimony(id:string) {
    this.service.getTestimonyById(id).subscribe({
      next: (testimony:Testimony | null) => {
        this.testimony = testimony;
        this.loadTestimonies(id);
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

  loadTestimonies(id:string) {
    const type = this.testimony?.audio_url ? 'audio': 'text';
    console.log(type);
    console.log(this.testimony?.audio_url);
    this.service.fetchTestimonies(id,type).subscribe({
      next: (testimony:Testimony[]) => {
        this.testimonies = testimony;
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }
}
