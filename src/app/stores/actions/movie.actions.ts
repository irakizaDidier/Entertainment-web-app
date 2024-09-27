import { createAction, props } from '@ngrx/store';

export const loadMoviesSuccess = createAction(
  '[Movie API] Load Movies Success',
  props<{ movies: any[] }>()
);

export const setSearchTerm = createAction(
  '[Movies] Set Search Term',
  props<{ searchTerm: string }>()
);

export const setBookmarkedShow = createAction(
  '[Show] set bookmarked show',
  props<{ title: string; isBookmarked: boolean }>()
);

export const resetMovies = createAction('[Movies] Reset Movies');
export const loadMovies = createAction('[Movie API] Load Movies');

export const loadMoviesFailure = createAction(
  '[Movie API] Load Movies Failure',
  props<{ error: any }>()
);

export const bookmarkShow = createAction(
  '[Movies] Bookmark Show',
  props<{ title: string }>()
);

export const bookmarkShowSuccess = createAction(
  '[Movies] Bookmark Show Success',
  props<{ title: string; isBookmarked: boolean }>()
);

export const bookmarkShowFailure = createAction(
  '[Movies] Bookmark Show Failure',
  props<{ error: any }>()
);
