import { Component, Input, OnInit } from '@angular/core';
import { MovieTypes } from '../../stores/reducers/movie.reducers';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css'],
})
export class MovieInfoComponent implements OnInit {
  @Input() movieData!: MovieTypes;

  constructor() {}

  ngOnInit(): void {}
}
