import { squirrelReducer, SquirrelActions, SquirrelState } from '@flowup/squirrel';
import { StoredTracking } from '../shared/models/tracking.model';
import { Action } from '@ngrx/store';

const modelName = 'TRACKING';
const generic = squirrelReducer(modelName);
const trackingAdditionalActions = {
  START: `${modelName}_API_START`,
  END: `${modelName}_API_END`,
  GET_LAST: `${modelName}_API_GET_LAST`
};
export const trackingActions = new SquirrelActions(modelName, trackingAdditionalActions);
export function trackingReducer(state: SquirrelState<StoredTracking> = {data: [], error: null, loading: false, origin: null},
                                action: Action) {
  switch (action.type) {
    default:
      return generic(state, action);
  }
}