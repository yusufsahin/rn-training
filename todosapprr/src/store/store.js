import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk}  from 'redux-thunk';
import todoReducer from './todoReducer';
const rootReducer = combineReducers({
   todos: todoReducer
});

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;