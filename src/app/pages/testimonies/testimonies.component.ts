import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import {TestimonyService} from '../../services/testimony.service';
import {Testimony} from '../../models/Testimony.class';
import {CardComponent} from '../../components/card/card.component';
import {StatService} from '../../services/stat.service';
import {Stat} from '../../models/Stat.class';
import { Router } from '@angular/router';


@Component({
  selector: 'app-testimonies',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, CardComponent],
  templateUrl: './testimonies.component.html'
})
export class TestimoniesComponent implements OnInit {

  constructor(
    private service:TestimonyService,
    private statsService: StatService,
    private router: Router
  ) {
  }
  col1: Testimony[] = [];
  col2: (Testimony | Stat)[] = [];
  col3: Testimony[] = [];

  testimonies: Testimony[] = [];
  stats: Stat[] = [];

  isStat(item:Testimony | Stat) {
    return item instanceof Stat;
  }

  goToId(id:string) {
    this.router.navigate(['/testimonies', id]);
  }

  ngOnInit() {
    this.loadTestimonies();
    this.loadStats();
  }

  loadTestimonies() {
    this.service.fetchTestimonies(null,null).subscribe({
      next: (testimonies:Testimony[]) => {
        this.testimonies = testimonies;
        this.distributeItems();
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

  loadStats() {
    this.statsService.fetchStats().subscribe({
      next: (stats:Stat[]) => {
        this.stats = stats;
        this.distributeItems();
      },
      error: (e: any) => {
        console.log(e);
      }
    });
  }

  distributeItems() {
    if (this.testimonies.length === 0 || this.stats.length === 0) {
      return;
    }

    const totalTestimonies = this.testimonies.length;
    const totalStats = this.stats.length;

    // Calculer combien d'éléments devraient aller dans les colonnes 1 et 3 (idéalement)
    // On vise un nombre égal d'éléments dans col1 et col3
    let targetSideColumns = Math.floor(totalTestimonies / 3);

    // Ajuster pour que col1 et col3 aient le même nombre d'éléments
    if (targetSideColumns % 2 !== 0) {
      // Si impair, on arrondit au nombre pair inférieur
      targetSideColumns = targetSideColumns - 1;
    }

    // Nombre d'éléments pour col1 et col3 (égal et pair)
    const col1Count = targetSideColumns;
    const col3Count = targetSideColumns;

    // Le reste va dans la colonne du milieu
    const col2TestimonyCount = totalTestimonies - (col1Count + col3Count);

    // Distribution des témoignages dans les colonnes 1 et 3
    this.col1 = this.testimonies.slice(0, col1Count);
    this.col3 = this.testimonies.slice(totalTestimonies - col3Count, totalTestimonies);

    // Sélectionner les témoignages pour la colonne du milieu
    const col2Testimonies = this.testimonies.slice(col1Count, col1Count + col2TestimonyCount);

    // Création de la liste alternée témoignage/stat pour la colonne 2
    this.col2 = [];

    // Ajouter les témoignages et stats en alternance
    for (let i = 0; i < Math.min(col2Testimonies.length, this.stats.length); i++) {
      // Ajouter un témoignage
      this.col2.push(col2Testimonies[i]);

      // Ajouter une stat
      this.col2.push(this.stats[i]);
    }

    // S'il reste des témoignages pour col2 après avoir épuisé les stats
    if (col2Testimonies.length > this.stats.length) {
      const remainingTestimonies = col2Testimonies.slice(this.stats.length);
      for (const testimony of remainingTestimonies) {
        this.col2.push(testimony);
      }
    }

    // Log pour déboguer
    console.log(`Distribution - Col1: ${this.col1.length}, Col2 testimony: ${col2Testimonies.length}, Col3: ${this.col3.length}`);
  }

}
