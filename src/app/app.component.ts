import {Component} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeroSectionComponent} from './components/hero-section/hero-section.component';


@Component({
  selector: 'app-root',
  imports: [ButtonModule, HeaderComponent, FooterComponent, HeroSectionComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'shelter-front';
}
