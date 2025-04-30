import { Component } from '@angular/core';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [
    PageHeaderComponent,
    InputText,
    FormsModule
  ],
  templateUrl: './contact.component.html'
})
export class ContactComponent {

}
