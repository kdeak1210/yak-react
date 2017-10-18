"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var APIManager = require("../utils").APIManager;
module.exports = {

  // Action triggered when comments received for a certain ZONE
  commentsReceived: function (comments, zone) {
    return {
      type: constants.COMMENTS_RECEIVED,
      comments: comments,
      zone: zone
    };
  },

  commentCreated: function (comment) {
    return {
      type: constants.COMMENT_CREATED,
      comment: comment
    };
  },

  /** For comment updates, takes the comment and the updates (params)
   * Uses REDUX THUNK
  */
  updateComment: function (comment, params) {
    return function (dispatch) {
      var endpoint = "/api/comment/" + comment._id;
      APIManager.put(endpoint, params, function (err, response) {
        if (err) {
          alert(err);
          return;
        };

        console.log(JSON.stringify(response));

        var updatedComment = response.result;
        dispatch({
          type: constants.COMMENT_UPDATED,
          comment: updatedComment
        });
      });
    };
  },

  /** Action triggered when zones come back from API */
  zonesReceived: function (zones) {
    return {
      type: constants.ZONES_RECEIVED, // type required for redux
      zones: zones // payload
    };
  },

  fetchZones: function (params) {
    return function (dispatch) {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: "loading",
        reducer: "zone"
      });

      APIManager.get("/api/zone", params, function (err, response) {
        if (err) {
          alert(err);
          return;
        }

        //console.log(JSON.stringify(response));
        var zones = response.results;

        dispatch({
          type: constants.ZONES_RECEIVED,
          zones: zones
        });
      });
    };
  },

  /** Action triggered when zone is posted ('zones' = payload from API) */
  zoneCreated: function (zone) {
    return {
      type: constants.ZONE_CREATED,
      zone: zone
    };
  },

  /** Action triggered when zone is selected, takes index of clicked zone */
  selectZone: function (index) {
    return {
      type: constants.SELECT_ZONE,
      selectedZone: index
    };
  },

  /** Action triggered when the current user is loaded into Store */
  currentUserReceived: function (user) {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      user: user
    };
  },

  /** Returns a FUNCTION (called by thunk) which executes the API call! */
  fetchProfile: function (params) {
    // insert the dispatch as an argument on our behalf (or else it wont have it)
    return function (dispatch) {
      // Dispatch an action (we are waiting for data)
      dispatch({
        type: constants.APPLICATION_STATE,
        status: "loading",
        reducer: "profile"
      });

      APIManager.get("/api/profile", params, function (err, response) {
        if (err) {
          console.log("ERROR: " + err);
          return;
        }

        // console.log('fetchProfile: ' + JSON.stringify(response));
        if (response.results.length == 0) {
          alert("Profile Not Found.");
          return;
        }

        var profile = response.results[0];
        // this.props.profileReceived(profile);

        // Directly dispatch an action (conduit to the reducer)
        dispatch({
          type: constants.PROFILE_RECEIVED,
          profile: profile
        });
      });
    };
  },

  updateProfile: function (profile, updated) {
    return function (dispatch) {
      APIManager.put("/api/profile/" + profile._id, updated, function (err, response) {
        if (err) {
          alert("ERROR: " + JSON.stringify(err));
          return;
        }
        console.log("Profile Updated: " + JSON.stringify(response));

        var updatedProfile = response.result;
        dispatch({
          type: constants.PROFILE_UPDATED,
          profile: updatedProfile
        });
      });
    };
  }

  // /** Action triggered when a user's profile information is loaded */
  // profileReceived: (profile) => {
  //   return {
  //     type: constants.PROFILE_RECEIVED,
  //     profile: profile
  //   }
  // }

};