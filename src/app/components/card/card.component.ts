import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import { CardModule } from 'primeng/card';
import {Avatar} from 'primeng/avatar';
import {formatToFrench} from '../../utils/datetime.utils';
import {getAvatarImage} from '../../utils/avatar.utils';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [CommonModule, CardModule, Avatar],
})
export class CardComponent {
  protected readonly formatToFrench = formatToFrench;
  protected readonly getAvatarImage = getAvatarImage;

  @Input({required: false}) orientation: string = 'vertical'; // vertical | horizontal
  @Input({required: false}) showContent: boolean = true;
  @Input({required: false}) type: string = 'text'; // text | audio
  @Input({required: false}) avatar: number = 0;
  @Input({required: false}) card_title: string = "Titre de l'article";
  @Input({required: false}) card_content: string = "Contenu de l'article";
  @Input({required: true}) date!: Date;
}
