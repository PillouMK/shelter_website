import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardUtils {
  constructor(private router: Router) {}

  goToId(id: string, type: string) {
    this.router.navigate(['/'+type, id]);
  }
}
