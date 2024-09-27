import { Component, EventEmitter, Input, Output } from '@angular/core';
import { setSearchTerm } from '../../stores/actions/movie.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() placeholderText: string;
  @Input() searchTerm: string = '';
  @Output() searchTermChange = new EventEmitter<string>();

  constructor(private store: Store) {
    this.placeholderText = '';
  }

  onInputChange() {
    // Trigger the action to update the search term in the NgRx state
    this.store.dispatch(setSearchTerm({ searchTerm: this.searchTerm }));
  }
}
