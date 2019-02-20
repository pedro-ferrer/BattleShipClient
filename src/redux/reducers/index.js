import { combineReducers } from 'redux';

const reducer = (state = {}, action) => state
const rootReducer = combineReducers({ reducer });

export default rootReducer;
