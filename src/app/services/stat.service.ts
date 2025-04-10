import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {Observable, of} from 'rxjs';
import { Testimony } from '../models/Testimony.class';
import { map, switchMap } from 'rxjs/operators';
import {StatStatus} from '../models/statStatus.enum';
import {Stat} from '../models/Stat.class';

@Injectable({
  providedIn: 'root',
})
export class StatService {
  private readonly storageKey = 'stats';
  private statsCollection!: AngularFirestoreCollection<Omit<Testimony, 'id'>>;

  constructor(private firestore: AngularFirestore) {
    this.statsCollection = this.firestore.collection<Omit<Testimony, 'id'>>(
      this.storageKey,
      ref => ref.where('status', '==', StatStatus.Published)
    );
  }

  fetchStats(): Observable<Stat[]> {
    return this.statsCollection.get({source: 'cache'}).pipe(
      switchMap(snapshot => {
        if (snapshot.empty) {
          return this.statsCollection.get({source: 'server'});
        } else {
          return of(snapshot);
        }
      }),
      map(snapshot => {
        return snapshot.docs.map(doc => {
          const id = doc.id;
          return Stat.fromJSON({id, ...doc.data()});
        });
      })
    );
  }
}
