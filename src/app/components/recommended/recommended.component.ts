import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMovies } from '../../stores/selectors/movie.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
})
export class RecommendedComponent implements OnInit {
  movies$: any;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.movies$ = this.store.select(selectMovies).pipe(
      map((movies) =>
        movies
          .filter((movie) => movie.isTrending !== true)
          .map((movie) => ({
            thumbnailLarge: movie.thumbnail?.regular?.large || '',
            isBookmarked: movie.isBookmarked,
            movieData: {
              title: movie.title,
              year: movie.year.toString(),
              category: movie.category,
              rating: movie.rating,
            },
          }))
      )
    );
  }
}
