import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DividerModule} from 'primeng/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  imports: [
    DividerModule,
    CommonModule,
  ]
})
export class FooterComponent  {
}
