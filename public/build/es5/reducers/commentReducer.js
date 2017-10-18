"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
  // list: [],
  // commentsLoaded: false,
  map: {}
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];


  var updated = Object.assign({}, state);
  var updatedMap = Object.assign({}, updated.map);

  switch (action.type) {

    case constants.COMMENTS_RECEIVED:
      var zoneComments = updatedMap[action.zone._id] ? Object.assign([], updatedMap[action.zone._id]) : [];
      // let zoneComments = updatedMap[action.zone._id];
      // if (zoneComments == null) {
      //   zoneComments = [];
      // } else {
      //   zoneComments = Object.assign([], zoneComments);
      // }

      // iterate through comments from BackEnd, stick inside map based on zone
      action.comments.forEach(function (comment, i) {
        zoneComments.push(comment);
      });

      updatedMap[action.zone._id] = zoneComments;
      updated.map = updatedMap;

      // console.log('COMMENTS RECEIVED: ' , updated);

      return updated;

    case constants.SELECT_ZONE:
      // updated['commentsLoaded'] = false;
      return updated;

    case constants.COMMENT_CREATED:
      console.log("COMMENT CREATED: " + JSON.stringify(action.comment));

      var commentList = updatedMap[action.comment.zone];
      if (commentList == null) {
        commentList = [];
      } else {
        commentList = Object.assign([], commentList);
      }

      commentList.push(action.comment);

      updatedMap[action.comment.zone] = commentList;
      updated.map = updatedMap;

      return updated;

    case constants.COMMENT_UPDATED:
      console.log("COMMENT UPDATED: " + JSON.stringify(action.comment));

      var list = updatedMap[action.comment.zone];
      var newList = [];

      list.forEach(function (comment, i) {
        if (comment._id == action.comment._id) {
          // insert updated comment
          newList.push(action.comment);
        } else {
          // else, insert the old comments
          newList.push(comment);
        }
      });

      updatedMap[action.comment.zone] = newList;
      updated.map = updatedMap;

      return updated;

    default:
      return state;
  }
};