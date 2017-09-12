import { combineReducers } from 'redux';
import calUpdates from './calender_update_reducer';


const rootReducer = combineReducers({
  // calender:calReducer,
  calender:calUpdates,

})

export default rootReducer;
