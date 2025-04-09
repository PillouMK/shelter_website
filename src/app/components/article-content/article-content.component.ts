import {Component, Input} from '@angular/core';
import {Card} from 'primeng/card';
import {Avatar} from 'primeng/avatar';
import {getAvatarImage} from '../../utils/avatar.utils';
import {MarkdownComponent, MarkdownService} from 'ngx-markdown';

@Component({
  selector: 'app-article-content',
  imports: [
    Card,
    Avatar,
    MarkdownComponent
  ],
  templateUrl: './article-content.component.html',
})
export class ArticleContentComponent {

  protected readonly getAvatarImage = getAvatarImage;

  @Input({required: false}) avatar: number = 0;
  @Input({required: false}) card_title: string = "Unknow, 3000 ans";
  @Input({required: false}) card_content: string = `
    # Titre de l'article
  `;
}
