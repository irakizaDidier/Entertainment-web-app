import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadMovies } from './stores/actions/movie.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    // Dispatch action to load movies when the component initializes
    this.store.dispatch(loadMovies());
  }

  // Checks whether the current route should use the authentication layout
  isAuthLayoutRoute(): boolean {
    const currentRoute = this.router.url;
    // Return true if the current route includes 'login' or 'signup'
    return currentRoute.includes('login') || currentRoute.includes('signup');
  }
}
