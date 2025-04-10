import {Component} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [ButtonModule, HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
