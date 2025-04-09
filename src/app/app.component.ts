import {Component} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeroSectionComponent} from './components/hero-section/hero-section.component';
import {PageHeaderComponent} from './components/page-header/page-header.component';
import {CardComponent} from './components/card/card.component';
import {ArticleContentComponent} from './components/article-content/article-content.component';
import {AudioPlayerComponent} from './components/audio-player/audio-player.component';


@Component({
  selector: 'app-root',
  imports: [ButtonModule, HeaderComponent, FooterComponent, HeroSectionComponent, PageHeaderComponent, CardComponent, ArticleContentComponent, AudioPlayerComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'shelter-front';
  date: Date = new Date();
}
