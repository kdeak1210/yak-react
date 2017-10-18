"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/** This file is essentially boilerplate - semantics are obvious */
var _redux = require("redux");

var createStore = _redux.createStore;
var combineReducers = _redux.combineReducers;
var applyMiddleware = _redux.applyMiddleware;
var thunk = _interopRequire(require("redux-thunk"));

var _reducers = require("../reducers");

var accountReducer = _reducers.accountReducer;
var commentReducer = _reducers.commentReducer;
var profileReducer = _reducers.profileReducer;
var zoneReducer = _reducers.zoneReducer;


var store;

module.exports = {

  // Passed as props to Provider, combines reducers and applies middleware
  configureStore: function () {
    var reducers = combineReducers({
      account: accountReducer,
      comment: commentReducer,
      profile: profileReducer,
      zone: zoneReducer });

    store = createStore(reducers, applyMiddleware(thunk));

    return store;
  },

  currentStore: function () {
    return store;
  }
};