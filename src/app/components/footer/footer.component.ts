import {Component} from '@angular/core';
import {Panel} from 'primeng/panel';
import {NgClass} from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  imports: [
    Panel,
    CommonModule,
    NgClass
  ]
})
export class FooterComponent  {
  isCollapsed = false;

  onCollapseChange(value : boolean){
    this.isCollapsed = value;
  }
}
