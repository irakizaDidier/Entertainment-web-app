import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MovieState, MovieTypes } from '../../stores/reducers/movie.reducers';
import {
  selectMovies,
  selectSearchTerm,
} from '../../stores/selectors/movie.selectors';

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.css'],
})
export class BookmarkedComponent implements OnInit {
  searchTerm: string = '';
  filteredShows: MovieTypes[] = [];
  movies: MovieTypes[] = [];
  series: MovieTypes[] = [];

  constructor(private store: Store<MovieState>) {}

  ngOnInit(): void {
    this.store.select(selectSearchTerm).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterShows();
    });

    this.store.select(selectMovies).subscribe((movies) => {
      this.movies = movies.filter(
        (movie) => movie.isBookmarked && movie.category === 'Movie'
      );
      this.series = movies.filter(
        (serie) => serie.isBookmarked && serie.category === 'TV Series'
      );
      this.filterShows();
    });
  }

  filterShows(): void {
    const lowercasedSearchTerm = this.searchTerm.toLowerCase();

    const filteredMovies = this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(lowercasedSearchTerm)
    );

    const filteredSeries = this.series.filter((serie) =>
      serie.title.toLowerCase().includes(lowercasedSearchTerm)
    );

    this.filteredShows = [...filteredMovies, ...filteredSeries];
  }
}
