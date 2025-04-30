import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import {TestimonyService} from '../../services/testimony.service';
import {Testimony} from '../../models/Testimony.class';
import {CardComponent} from '../../components/card/card.component';
import {StatService} from '../../services/stat.service';
import {Stat} from '../../models/Stat.class';
import {CardUtils} from '../../utils/card.utils';


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
    public cardUtils: CardUtils,
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

  ngOnInit() {
    this.loadTestimonies();
    this.loadStats();
  }

  loadTestimonies() {
    this.service.fetchTestimonies(null,null).subscribe({
      next: (testimonies:Testimony[]) => {
        console.log(testimonies);
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

    // Réinitialiser les colonnes
    this.col1 = [];
    this.col2 = [];
    this.col3 = [];

    // Copier les témoignages et statistiques
    const allTestimonies = [...this.testimonies];
    const allStats = [...this.stats];
    const totalItems = allTestimonies.length + allStats.length;

    // Calcul du nombre optimal d'éléments par colonne
    let itemsPerColumn = Math.floor(totalItems / 3);
    const remainder = totalItems % 3;

    // Ajuster selon le reste
    let col1Count = itemsPerColumn;
    let col2Count = itemsPerColumn;
    let col3Count = itemsPerColumn;

    if (remainder === 1) {
      col2Count += 1; // Le surplus va dans la colonne du milieu
    } else if (remainder === 2) {
      col1Count += 1; // Un élément supplémentaire dans col1
      col3Count += 1; // Un élément supplémentaire dans col3
    }

    // Vérifier qu'il y a au moins un témoignage pour commencer la colonne 2
    if (allTestimonies.length === 0) {
      // S'il n'y a pas de témoignage, on ne peut pas commencer col2 par un témoignage
      // Dans ce cas, on remplit simplement avec les statistiques disponibles
      this.col2 = [...allStats];
      return;
    }

    // Calculer combien de témoignages mettre dans les colonnes latérales
    // pour garantir qu'il en reste assez pour alterner avec les stats dans col2
    // On a besoin d'au moins un témoignage pour commencer col2,
    // puis potentiellement d'autres pour l'alternance
    const minTestimoniesForCol2 = Math.ceil(Math.min(col2Count, allStats.length + 1) / 2);
    const maxTestimoniesForSideColumns = Math.max(0, allTestimonies.length - minTestimoniesForCol2);

    // S'assurer que les colonnes latérales ont un nombre égal de témoignages
    const testimoniesPerSideColumn = Math.floor(maxTestimoniesForSideColumns / 2);

    // Remplir les colonnes latérales
    for (let i = 0; i < testimoniesPerSideColumn && allTestimonies.length > 0; i++) {
      this.col1.push(<Testimony>allTestimonies.shift());
    }

    for (let i = 0; i < testimoniesPerSideColumn && allTestimonies.length > 0; i++) {
      this.col3.push(<Testimony>allTestimonies.shift());
    }

    // Remplir la colonne du milieu en alternant témoignages et stats
    // Commencer TOUJOURS par un témoignage
    let startWithTestimony = true;
    while ((allTestimonies.length > 0 || allStats.length > 0) && this.col2.length < col2Count) {
      if (startWithTestimony) {
        if (allTestimonies.length > 0) {
          // @ts-ignore
          this.col2.push(allTestimonies.shift());
        } else if (allStats.length > 0) {
          // @ts-ignore
          this.col2.push(allStats.shift());
        }
        startWithTestimony = false;
      } else {
        if (allStats.length > 0) {
          // @ts-ignore
          this.col2.push(allStats.shift());
        } else if (allTestimonies.length > 0) {
          // @ts-ignore
          this.col2.push(allTestimonies.shift());
        }
        startWithTestimony = true;
      }
    }

    // Distribuer les éléments restants dans les colonnes latérales
    // en maintenant l'égalité entre col1 et col3
    while (allTestimonies.length > 0 || allStats.length > 0) {
      // Priorité aux témoignages pour les colonnes latérales
      if (this.col1.length < this.col3.length) {
        if (allTestimonies.length > 0) {
          this.col1.push(<Testimony>allTestimonies.shift());
        } else if (allStats.length > 0) {
          // @ts-ignore
          this.col1.push(allStats.shift());
        }
      } else if (this.col3.length < this.col1.length) {
        if (allTestimonies.length > 0) {
          this.col3.push(<Testimony>allTestimonies.shift());
        } else if (allStats.length > 0) {
          // @ts-ignore
          this.col3.push(allStats.shift());
        }
      } else {
        // Si col1 et col3 sont égales, ajouter à celle qui a le moins d'éléments par rapport à la cible
        if (this.col1.length < col1Count) {
          if (allTestimonies.length > 0) {
            this.col1.push(<Testimony>allTestimonies.shift());
          } else if (allStats.length > 0) {
            // @ts-ignore
            this.col1.push(allStats.shift());
          }
        } else if (this.col3.length < col3Count) {
          if (allTestimonies.length > 0) {
            this.col3.push(<Testimony>allTestimonies.shift());
          } else if (allStats.length > 0) {
            // @ts-ignore
            this.col3.push(allStats.shift());
          }
        } else {
          // Si les deux colonnes latérales sont pleines, ajouter à col2
          if (allTestimonies.length > 0) {
            // @ts-ignore
            this.col2.push(allTestimonies.shift());
          } else if (allStats.length > 0) {
            // @ts-ignore
            this.col2.push(allStats.shift());
          }
        }
      }
    }

    // Vérification finale pour s'assurer que col1 et col3 ont le même nombre d'éléments
    while (this.col1.length > this.col3.length) {
      // @ts-ignore
      this.col2.push(this.col1.pop());
    }

    while (this.col3.length > this.col1.length) {
      // @ts-ignore
      this.col2.push(this.col3.pop());
    }
  }
}
