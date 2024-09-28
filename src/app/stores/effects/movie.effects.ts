import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import {
  loadMoviesSuccess,
  loadMovies,
  loadMoviesFailure,
} from '../actions/movie.actions';

@Injectable()
export class MovieEffects {
  private movieDataUrl = '../../assets/data.json';

  constructor(private http: HttpClient) {}
  private actions$ = inject(Actions);

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovies),
      mergeMap(() => {
        const moviesDataRequest = this.http.get<any[]>(this.movieDataUrl);
        const bookmarkedShows: string[] = JSON.parse(
          localStorage.getItem('bookmarkedShows') || '[]'
        );

        return moviesDataRequest.pipe(
          map((moviesData) => {
            const moviesWithBookmark = moviesData.map((movie) => ({
              ...movie,
              isBookmarked: bookmarkedShows.includes(movie.title),
            }));

            return loadMoviesSuccess({ movies: moviesWithBookmark });
          }),
          catchError((error) => {
            console.error(error);
            return of(loadMoviesFailure({ error }));
          })
        );
      })
    )
  );
}
