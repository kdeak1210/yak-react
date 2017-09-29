/** This file is essentially boilerplate - semantics are obvious */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { accountReducer, commentReducer, profileReducer, zoneReducer } from '../reducers';

var store;

export default {

  // Passed as props to Provider, combines reducers and applies middleware
  configureStore: () => {
    const reducers = combineReducers({
      account: accountReducer,
      comment: commentReducer,
      profile: profileReducer,     
      zone: zoneReducer,
    });

    store = createStore(
      reducers,
      applyMiddleware(thunk)
    )

    return store;
  },

  currentStore: () => {
    return store;
  }
}