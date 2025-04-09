import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Button} from 'primeng/button';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  standalone: true,
  imports: [CommonModule, Button],
})
export class HeroSectionComponent {

}
