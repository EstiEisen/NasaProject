import { createStore, combineReducers } from 'redux';
import userReducer from './Reducers/User'
import pictureReducer from './Reducers/Picture'

const reducer = combineReducers({ userReducer, pictureReducer });

const store = createStore(reducer);
window.store = store;
export default store;
