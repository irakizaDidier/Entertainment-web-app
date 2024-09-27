import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { bookmarkShow } from '../../stores/actions/movie.actions';

@Component({
  selector: 'app-bookmark-button',
  templateUrl: './bookmark-button.component.html',
  styleUrl: './bookmark-button.component.css',
})
export class BookmarkButtonComponent {
  @Input() showBookmarkedImg: boolean = false;
  @Input() showTitle: string = '';

  constructor(private store: Store) {}

  bookmarkFn(): void {
    this.store.dispatch(bookmarkShow({ title: this.showTitle }));
  }
}
