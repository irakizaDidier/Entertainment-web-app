import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { setBookmarkedShow } from '../../stores/actions/movie.actions';

@Component({
  selector: 'app-bookmark-button',
  templateUrl: './bookmark-button.component.html',
  styleUrls: ['./bookmark-button.component.css'],
})
export class BookmarkButtonComponent {
  @Input() showBookmarkedImg: boolean = false;
  @Input() showTitle: string = '';

  constructor(private store: Store) {}

  bookmarkFn(): void {
    if (this.showTitle) {
      this.store.dispatch(
        setBookmarkedShow({
          title: this.showTitle,
          isBookmarked: !this.showBookmarkedImg,
        })
      );
    }
  }
}
