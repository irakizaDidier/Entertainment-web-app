import { Component, Input } from '@angular/core';

interface MovieType {
  title: string;
  year: string;
  category: string;
  rating: string;
}

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.css',
})
export class MovieInfoComponent {
  @Input() movieData: MovieType;

  constructor() {
    this.movieData = {
      title: '',
      year: '',
      category: '',
      rating: '',
    };
  }
}
