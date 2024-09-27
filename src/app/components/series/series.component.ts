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
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
})
export class SeriesComponent implements OnInit {
  searchTerm: string = '';
  filteredSeries: MovieTypes[] = [];
  movies: MovieTypes[] = [];

  constructor(private store: Store<MovieState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(checkToken());

    this.store.select(selectSearchTerm).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterSeries();
    });

    this.store.select(selectMovies).subscribe((movies) => {
      this.movies = movies;
      this.filterSeries();
    });
  }

  filterSeries(): void {
    this.filteredSeries = this.movies.filter(
      (movie) =>
        movie.category === 'TV Series' &&
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
