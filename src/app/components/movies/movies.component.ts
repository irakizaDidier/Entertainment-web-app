import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MovieState, MovieTypes } from '../../stores/reducers/movie.reducers';
import {
  selectMovies,
  selectSearchTerm,
} from '../../stores/selectors/movie.selectors';
import { checkToken } from '../../stores/actions/auth.actions';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  searchTerm: string = '';
  movies: MovieTypes[] = [];
  filteredMovies: MovieTypes[] = [];

  constructor(private store: Store<MovieState>, private router: Router) {}

  ngOnInit(): void {
    this.store.select(selectSearchTerm).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      console.log('Current Search Term:', this.searchTerm);
      this.filterMovies();
    });

    this.store.select(selectMovies).subscribe((movies) => {
      this.movies = movies;
      console.log('Fetched Movies:', movies);
      this.filterMovies();
    });

    this.store.dispatch(checkToken());
  }

  filterMovies(): void {
    this.filteredMovies = this.movies.filter(
      (movie) =>
        movie.category === 'Movie' &&
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log('Filtered Movies:', this.filteredMovies);
  }
}
