import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMovies } from '../../stores/selectors/movie.selectors';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MovieTypes } from '../../stores/reducers/movie.reducers';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css',
})
export class TrendingComponent implements OnInit {
  movies$: Observable<any> | undefined; 

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.movies$ = this.store.select(selectMovies).pipe(
      map((movies: MovieTypes[]) =>
        movies
          .filter((movie) => movie.isTrending === true)
          .map((movie) => ({
            movieData: {
              title: movie.title,
              year: movie.year.toString(),
              category: movie.category,
              rating: movie.rating,
            },
            isBookmarked: movie.isBookmarked,
            isTrending: movie.isTrending,
            thumbnailLarge: movie.thumbnail.trending?.large || '',
            thumbnailSmall: movie.thumbnail.trending?.small || '',
          }))
      )
    );
  }
}
