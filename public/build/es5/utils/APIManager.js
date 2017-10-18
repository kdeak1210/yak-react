"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/** A class to handle all the axios HTTP request methods */
var axios = _interopRequire(require("axios"));

var superagent = _interopRequire(require("superagent"));

module.exports = {

  get: function (url, params, callback) {
    axios.get(url, { params: params }).then(function (response) {
      var confirmation = response.data.confirmation;
      if (confirmation != "success") {
        // Send our custom error message, along with null (no response)
        callback({ message: response.data.message }, null);
      }
      callback(null, response.data);
    })["catch"](function (err) {
      callback(err, null);
    });
  },

  post: function (url, body, callback) {
    axios.post(url, body).then(function (response) {
      var confirmation = response.data.confirmation;
      if (confirmation != "success") {
        callback({ message: response.data.message }, null);
      }
      callback(null, response.data);
    })["catch"](function (err) {
      callback(err, null);
    });
  },

  put: function (url, body, callback) {
    axios.put(url, body).then(function (response) {
      var confirmation = response.data.confirmation;
      if (confirmation != "success") {
        callback({ message: response.data.message }, null);
      }
      callback(null, response.data);
    })["catch"](function (err) {
      callback(err, null);
    });
  },

  "delete": function () {},

  upload: function (endpoint, file, params, callback) {
    console.log("APIManager - upload: ");

    var uploadRequest = superagent.post(endpoint);

    uploadRequest.attach("file", file);
    Object.keys(params).forEach(function (key) {
      uploadRequest.field(key, params[key]);
    });

    uploadRequest.end(function (err, response) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, response);
    });
  }

};