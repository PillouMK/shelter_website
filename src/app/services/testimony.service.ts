import {EnvironmentInjector, inject, Injectable, runInInjectionContext} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {Observable, of} from 'rxjs';
import { ArticleStatus } from '../models/articleStatus.enum';
import { Testimony } from '../models/Testimony.class';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TestimonyService {
  private readonly storageKey = 'testimony';
  private environmentInjector  = inject(EnvironmentInjector);

  fetchTestimonies(id:string | null, type:string | null): Observable<Testimony[]> {
    return runInInjectionContext(this.environmentInjector, () => {
      const firestore = inject(AngularFirestore);

      const collection = firestore.collection<Omit<Testimony, 'id'>>(
        this.storageKey,
        ref => {
          let query = ref.where('status', '==', ArticleStatus.Published);
          if (type=='audio') {
            query = query.where('audio', '!=', null);
          }
          if (type=='text') {
            query = query.where('audio', '==', null);
          }
          return query;
        }
      );

      return collection.get({source: 'cache'}).pipe(
        switchMap(snapshot => {
          if (snapshot.empty) {
            return collection.get({source: 'server'});
          } else {
            return of(snapshot);
          }
        }),
        map(snapshot => {
          return snapshot.docs.map(doc => {
            const id = doc.id;
            return Testimony.fromJSON({id, ...doc.data()});
          }).filter(testimony => testimony.id !== id);
        })
      );
    });
  }

  getTestimonyById(id: string): Observable<Testimony | null> {
    return runInInjectionContext(this.environmentInjector, () => {
        const firestore = inject(AngularFirestore);
        const docRef = firestore.doc<Omit<Testimony, 'id'>>(`${this.storageKey}/${id}`);

      return docRef.get({source: 'cache'}).pipe(
        switchMap(doc => {
          if (!doc.exists) {
            return docRef.get({source: 'server'});
          } else {
            return of(doc);
          }
        }),
        map(doc => {
          if (doc.exists) {
            return Testimony.fromJSON({id: doc.id, ...doc.data()});
          } else {
            return null;
          }
        })
      );
    });
  }
}
