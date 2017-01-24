import { Action } from '@ngrx/store';
import { StoreModel } from '../models/store-model';
import { GRSearchBook } from '../models/goodreadsBook.model';


export function searchReducer(state: StoreModel<GRSearchBook> = {data: []}, action: Action): StoreModel<GRSearchBook> {
  switch (action.type) {
    case 'GET_SEARCH_SUCCESSFUL':
      return Object.assign({}, {data: action.payload});
    case 'GET_SEARCH_FAILURE':
      return Object.assign({}, {data: []}, {error: action.payload.error ? new Error(action.payload.error) : new Error('API is offile')});

    case 'SEARCH_DESTROY':
      return Object.assign({}, {data: []});
    default:
      return state;
  }

}



