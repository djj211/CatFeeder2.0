import { combineReducers, Reducer } from 'redux';

import commonState from '../state/reducer';

export default combineReducers({
  commonState,
}) as Reducer;
