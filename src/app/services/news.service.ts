import {EnvironmentInjector, inject, Injectable, runInInjectionContext} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable, of} from 'rxjs';
import {ArticleStatus} from '../models/articleStatus.enum';
import {Testimony} from '../models/Testimony.class';
import {map, switchMap} from 'rxjs/operators';
import {News} from '../models/News.class';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly storageKey = 'news';
  private environmentInjector  = inject(EnvironmentInjector);

  fetchNews(id:string | null, limit:number): Observable<News[]> {
    return runInInjectionContext(this.environmentInjector, () => {
      const firestore = inject(AngularFirestore);

      const collection = firestore.collection<Omit<Testimony, 'id'>>(
        this.storageKey,
        ref => {
          let query = ref
            .where('status', '==', ArticleStatus.Published);

          if (limit > 0) {
            query = query.limit(limit);
          }

          return query;
        }
      );

      return collection.get({source: 'cache'}).pipe(
        switchMap(snapshot => {
          if (snapshot.empty || snapshot.size < limit) {
            return collection.get({source: 'server'});
          } else {
            return of(snapshot);
          }
        }),
        map(snapshot => {
          return snapshot.docs.map(doc => {
            const id = doc.id;
            return News.fromJSON({id, ...doc.data()});
          }).filter(news => news.id !== id);
        })
      );
    });
  }

  getNewsById(id: string): Observable<News | null> {
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
            return News.fromJSON({id: doc.id, ...doc.data()});
          } else {
            return null;
          }
        })
      );
    });
  }
}
