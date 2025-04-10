import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NewsComponent} from './pages/news/news.component';
import {TestimoniesComponent} from './pages/testimonies/testimonies.component';
import {TestimonyComponent} from './pages/testimony/testimony.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'testimonies',
    children: [
      {
        path: '',
        component: TestimoniesComponent
      },
      {
        path: ':testimonyId',
        component: TestimonyComponent
      }
    ]
  },


];
