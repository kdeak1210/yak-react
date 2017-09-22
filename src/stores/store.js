/** This file is essentially boilerplate - semantics are obvious */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// I HAD AN ERROR FOREVER TRYING TO IMPORT THIS WITH { BRACKETS }
import zoneReducer from '../reducers/zoneReducer';

var store;

export default {

  // Passed as props to Provider, brings the reducers together
  configureStore: () => {
    const reducers = combineReducers({
      zone: zoneReducer
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