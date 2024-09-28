import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectMovies,
  selectSearchTerm,
} from '../../stores/selectors/movie.selectors';
import { MovieState, MovieTypes } from '../../stores/reducers/movie.reducers';
import { setSearchTerm, loadMovies } from '../../stores/actions/movie.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  shows: MovieTypes[] = [];
  filteredShows: MovieTypes[] = [];

  constructor(
    private router: Router,
    private store: Store<MovieState>
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.store.select(selectSearchTerm).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterShows();
    });

    this.store.select(selectMovies).subscribe((shows) => {
      this.shows = shows;
      this.filterShows();
    });
  }

  loadMovies(): void {
    this.store.dispatch(loadMovies());
  }

  filterShows(): void {
    this.filteredShows = this.shows.filter((movie) =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchTermChange(searchTerm: string): void {
    this.store.dispatch(setSearchTerm({ searchTerm }));
  }
}
