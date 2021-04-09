import { combineReducers } from 'redux';

import datasetsReducer from './datasets/datasets.reducer';

export default combineReducers({
  datasets: datasetsReducer
})