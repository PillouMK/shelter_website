import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { InputText } from 'primeng/inputtext';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {environment} from '../../environments/environment';


@Component({
  selector: 'app-contact',
  imports: [
    PageHeaderComponent,
    InputText,
    ReactiveFormsModule,
    FormsModule,
    Textarea,
    Button,
    MessagesModule,
    MessageModule,
    CommonModule,
    Toast
  ],
  templateUrl: './contact.component.html',
  providers: [MessageService]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private messageService: MessageService) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['Anonyme'],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(e: Event) {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    emailjs
      .sendForm(environment.mailjs.serviceId, environment.mailjs.templateId, e.target as HTMLFormElement, {
        publicKey: environment.mailjs.publicKey,
      })
      .then(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Email envoyé', detail: "Merci de nous avoir contacté nous reviendrons vers vous le plus rapidement possible." });
          this.contactForm.reset();
          this.submitted = false;
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: "Echec de l'envoie", detail: "Réessayez plus tard." });
          this.submitted = false;
        },
      );


  }
}
