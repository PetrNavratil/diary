import { Action } from '@ngrx/store';
import { GRBook } from '../../shared/models/goodreadsBook.model';
import { StoreModel } from '../../shared/models/store-model';


export function detailReducer(state: StoreModel<GRBook> = {data: []}, action: Action): StoreModel<GRBook> {
  switch (action.type) {
    case 'GET_DETAIL_SUCCESSFUL':
      return Object.assign({}, {data: [action.payload]});
    case 'GET_DETAIL_FAILURE':
      return Object.assign({}, {data: []}, {error: action.payload.error ? new Error(action.payload.error) : new Error('API is offile')});

    default:
      return state;
  }

}



