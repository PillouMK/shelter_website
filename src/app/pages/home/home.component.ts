import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroSectionComponent} from '../../components/hero-section/hero-section.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
  imports: [CommonModule, HeroSectionComponent]
})
export class HomeComponent {


}
