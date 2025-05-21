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

  fetchNews(id: string | null, limit: number, searchTerm: string | null): Observable<News[]> {
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
          let results = snapshot.docs.map(doc => {
            const id = doc.id;
            return News.fromJSON({id, ...doc.data()});
          }).filter(testimony => testimony.id !== id);

          if (searchTerm && searchTerm.trim().length > 0) {
            const term = searchTerm.toLowerCase();
            results = results.filter(news =>
              news.title && news.title.toLowerCase().includes(term)
            );
          }
          return results;
        })
      );
    });
  }

  getNewsById(id: string): Observable<News | null> {
    return runInInjectionContext(this.environmentInjector, () => {
        const firestore = inject(AngularFirestore);
        const docRef = firestore.doc<Omit<News, 'id'>>(`${this.storageKey}/${id}`);

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
