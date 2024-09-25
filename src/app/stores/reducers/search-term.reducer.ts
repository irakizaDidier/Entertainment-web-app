import { createReducer, on } from '@ngrx/store';
import { setSearchTerm, clearSearchTerm } from '../actions/search-term.actions';

export interface SearchTermState {
  searchTerm: string;
}

export const initialState: SearchTermState = {
  searchTerm: '',
};

export const searchTermReducer = createReducer(
  initialState,
  on(setSearchTerm, (state, { searchTerm }) => ({ ...state, searchTerm })),
  on(clearSearchTerm, (state) => ({ ...state, searchTerm: '' }))
);
