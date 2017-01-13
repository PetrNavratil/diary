import { Action } from '@ngrx/store';
import { StoreModel } from '../models/store-model';
import { GRBook, makeGRBook } from '../models/goodreadsBook.model';


export function searchReducer(state: StoreModel<GRBook> = {data: []}, action: Action): StoreModel<GRBook> {
  switch (action.type) {
    case 'GET_SEARCH_SUCCESSFUL':
      let books: GRBook[] = [];
      if (!action.payload) {
        return state;
      }
      if (action.payload instanceof Array) {
        books = action.payload.map(book => makeGRBook(book));
      } else {
        console.log('data', action.payload);
        books.push(makeGRBook(action.payload))
      }

      return Object.assign({}, {data: books});
    case 'GET_SEARCH_FAILURE':
      return Object.assign({}, {data: []}, {error: action.payload.error ? new Error(action.payload.error) : new Error('API is offile')});

    default:
      return state;
  }

}



