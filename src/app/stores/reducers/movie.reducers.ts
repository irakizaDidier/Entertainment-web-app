import { createReducer, on } from '@ngrx/store';
import {
  loadMoviesSuccess,
  resetMovies,
  setBookmarkedShow,
  setSearchTerm,
} from '../actions/movie.actions';

interface Thumbnail {
  small: string;
  large: string;
  medium: string;
}

interface Regular {
  small: string;
  medium: string;
  large: string;
}

export interface MovieTypes {
  title: string;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
  thumbnail: {
    trending: Thumbnail;
    regular: Regular;
  };
}

export interface MovieState {
  movies: MovieTypes[];
  searchTerm: string;
}

export const initialState: MovieState = {
  movies: [],
  searchTerm: '',
};

function updateBookmarkedShowsInLocalStorage(movies: MovieTypes[]) {
  const bookmarkedTitles = movies
    .filter((movie) => movie.isBookmarked)
    .map((movie) => movie.title);

  localStorage.setItem('bookmarkedShows', JSON.stringify(bookmarkedTitles));
}

export const movieReducer = createReducer(
  initialState,

  on(loadMoviesSuccess, (state, { movies }) => {
    const updatedMovies = movies.map((movie) => ({
      ...movie,
      year: Number(movie.year),
      isBookmarked: movie.isBookmarked ?? false,
      isTrending: movie.isTrending ?? false,
      thumbnail: movie.thumbnail ?? {
        trending: { small: '', large: '', medium: '' },
        regular: { small: '', medium: '', large: '' },
      },
    }));
    return { ...state, movies: updatedMovies };
  }),

  on(setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),

  on(resetMovies, () => initialState),

  on(setBookmarkedShow, (state, { isBookmarked, title }) => {
    const updatedMovies = state.movies.map((movie) => {
      if (movie.title === title) {
        return { ...movie, isBookmarked };
      }
      return movie;
    });
    updateBookmarkedShowsInLocalStorage(updatedMovies);

    return {
      ...state,
      movies: updatedMovies,
    };
  })
);
