import { squirrelReducer, SquirrelActions, SquirrelState } from '@flowup/squirrel';
import { Action } from '@ngrx/store';
import { Book } from '../shared/models/book.model';

const modelName = 'BOOK';
const generic = squirrelReducer(modelName);

export const booksActions = new SquirrelActions(modelName);

export function booksReducer(state: SquirrelState<Book> = {data: [], error: null, loading: false, origin: null},
                            action: Action) {
  switch (action.type) {
    default:
      return generic(state, action);
  }
}
