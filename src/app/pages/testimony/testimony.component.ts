import {Component, OnInit} from '@angular/core';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import {Testimony} from '../../models/Testimony.class';
import {TestimonyService} from '../../services/testimony.service';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AudioPlayerComponent} from '../../components/audio-player/audio-player.component';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-testimony',
  imports: [
    PageHeaderComponent,
    CommonModule,
    AudioPlayerComponent,
    CarouselModule
  ],
  templateUrl: './testimony.component.html'
})
export class TestimonyComponent implements OnInit {

  testimony: Testimony | null = null;
  audioTestimonies: Testimony[] = [];
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
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['testimonyId'];
      this.loadTestimony(id);
      this.loadAudioTestimonies(id);
    });
  }

  loadTestimony(id:string) {
    this.service.getTestimonyById(id).subscribe({
      next: (testimony:Testimony | null) => {
        this.testimony = testimony;
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

  loadAudioTestimonies(id:string) {
    this.service.fetchAudioTestimonies(id).subscribe({
      next: (testimony:Testimony[]) => {
        this.audioTestimonies = testimony;
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }
}
