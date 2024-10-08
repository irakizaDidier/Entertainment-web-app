import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from '../reducers/movie.reducers';

export const selectMovieState = createFeatureSelector<MovieState>('movie');

export const selectMovies = createSelector(
  selectMovieState,
  (state: MovieState) => state.movies
);

export const selectSearchTerm = createSelector(
  selectMovieState,
  (state) => state.searchTerm
);



export const selectMovieByTitle = (title: string) =>
  createSelector(selectMovies, (movies) =>
    movies.find((movie) => movie.title === title)
  );
