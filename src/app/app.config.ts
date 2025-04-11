import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {providePrimeNG} from 'primeng/config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import ShelterPreset from './theme/shelter.theme';
import {provideHttpClient} from '@angular/common/http';
import {environment} from './environments/environment';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {enableIndexedDbPersistence, getFirestore, provideFirestore} from '@angular/fire/firestore';
import {FIREBASE_OPTIONS} from '@angular/fire/compat';
import { provideMarkdown } from 'ngx-markdown';

const app = initializeApp(environment.firebase);

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideMarkdown(),
    provideFirebaseApp(() => app),
    provideFirestore(() => getFirestore(app)),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: ShelterPreset,
        options: {
          darkModeSelector: '.fake-dark-selector',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          }
        }
      }
    })
  ]
};
