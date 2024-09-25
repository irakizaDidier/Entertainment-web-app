import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { setSearchTerm } from '../actions/search-term.actions';

@Injectable()
export class SearchTermEffects {
  constructor(private actions$: Actions, private store: Store) {}

  logSearchTermChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setSearchTerm),
        tap(({ searchTerm }) => {
          console.log('Search term changed:', searchTerm);
        })
      ),
    { dispatch: false }
  );
}
