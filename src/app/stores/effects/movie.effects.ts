import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import {
  loadMoviesSuccess,
  loadMovies,
  loadMoviesFailure,
} from '../actions/movie.actions';

@Injectable()
export class MovieEffects {
  private movieDataUrl = '../../assets/data.json';
  private getBookmarkedShowsUrl =
    'https://real-erin-cow-boot.cyclic.app/bookmark/get';

  constructor(private actions$: Actions, private http: HttpClient) {}

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovies),
      mergeMap(() => {
        const bookmarkedShowsRequest = this.http.get<string[]>(
          this.getBookmarkedShowsUrl,
          { withCredentials: true }
        );
        const moviesDataRequest = this.http.get<any[]>(this.movieDataUrl);

        return forkJoin([bookmarkedShowsRequest, moviesDataRequest]).pipe(
          map(([bookmarkedShows, moviesData]) => {
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
