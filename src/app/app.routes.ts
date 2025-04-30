import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NewsComponent} from './pages/news/news.component';
import {TestimoniesComponent} from './pages/testimonies/testimonies.component';
import {ArticleComponent} from './pages/article/article.component';
import {ContactComponent} from './pages/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'news',
    children: [
      {
        path: '',
        component: NewsComponent
      },
      {
        path: ':newsId',
        component: ArticleComponent
      }
    ]
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
        component: ArticleComponent
      }
    ]
  },
  {
    path: 'contact',
    component: ContactComponent
  },

];
