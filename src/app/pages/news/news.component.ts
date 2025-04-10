import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent
  ],
  templateUrl: './news.component.html',
})
export class NewsComponent{

}
