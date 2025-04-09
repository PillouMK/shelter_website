import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class PageHeaderComponent {

  @Input({required: true}) title: string | null = null;
  @Input({required: true}) description: string | null = null;
  @Input({required: false}) image_number: number = 0;
}
