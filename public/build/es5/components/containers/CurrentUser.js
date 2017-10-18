"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var Dropzone = _interopRequire(require("react-dropzone"));

var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var sha1 = _interopRequire(require("sha1"));

var CurrentUser = (function (Component) {
  function CurrentUser() {
    _classCallCheck(this, CurrentUser);

    _get(Object.getPrototypeOf(CurrentUser.prototype), "constructor", this).call(this);
    this.state = {
      updated: {}
    };
    this.uploadImage = this.uploadImage.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  _inherits(CurrentUser, Component);

  _prototypeProperties(CurrentUser, null, {
    componentDidMount: {
      value: function componentDidMount() {
        console.log("componentDidMount: " + JSON.stringify(this.props.user));
      },
      writable: true,
      configurable: true
    },
    updateCurrentUser: {
      value: function updateCurrentUser(e) {
        e.preventDefault();
        // console.log('updateCurrentUser: ', e.target.value);
        var updatedProfile = Object.assign({}, this.state.updated);
        updatedProfile[e.target.id] = e.target.value;

        this.setState({
          updated: updatedProfile
        });
      },
      writable: true,
      configurable: true
    },
    updateProfile: {
      value: function updateProfile(e) {
        e.preventDefault();
        console.log("Update Profile: ", this.state.updated);

        if (Object.keys(this.state.updated).length == 0) {
          alert("No Changes Made!!!");
          return;
        }

        this.props.updateProfile(this.props.user, this.state.updated);
      },
      writable: true,
      configurable: true
    },
    uploadImage: {

      // Function interacting w/ Dropzone, takes array of files (i only need one)
      value: function uploadImage(files) {
        var _this = this;
        var image = files[0];

        var cloudName = "hrh27qwfe";
        var url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";

        var timestamp = Date.now() / 1000;
        var uploadPreset = "yistkhgi";

        /* Create Special signature for request params
        https://cloudinary.com/documentation/upload_images#creating_api_authentication_signatures
        */
        var paramsStr = "timestamp=" + timestamp + "&upload_preset=" + uploadPreset + "d0uEXCZQ9ekXgk12quxraGKwHqE";
        var signature = sha1(paramsStr);

        /* Required parameters for authenticated requests to Cloudinary API
        https://cloudinary.com/documentation/upload_images#uploading_with_a_direct_call_to_the_api
        */
        var params = {
          api_key: "763811365227231",
          timestamp: timestamp,
          upload_preset: uploadPreset,
          signature: signature
        };

        console.log("uploadImage: ", image);

        APIManager.upload(url, image, params, function (err, response) {
          if (err) {
            alert(err);
            return;
          }
          // console.log('UPLOAD COMPLETE: ' + JSON.stringify(response.body));

          var updatedProfile = Object.assign({}, _this.state.updated);
          updatedProfile.image = response.body.secure_url;
          _this.setState({
            updated: updatedProfile
          });
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var currentUser = this.props.user;
        var image = this.state.updated.image == null ? "" : ImageHelper.thumbnail(this.state.updated.image, 150);

        return React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            null,
            "Welcome ",
            currentUser.username
          ),
          React.createElement("input", { type: "text", id: "username", onChange: this.updateCurrentUser, defaultValue: currentUser.username, placeholder: "Username" }),
          React.createElement("br", null),
          React.createElement("input", { type: "text", id: "gender", onChange: this.updateCurrentUser, defaultValue: currentUser.gender, placeholder: "Gender" }),
          React.createElement("br", null),
          React.createElement("input", { type: "text", id: "city", onChange: this.updateCurrentUser, defaultValue: currentUser.city, placeholder: "City" }),
          React.createElement("br", null),
          React.createElement("img", { src: image }),
          React.createElement("br", null),
          React.createElement(Dropzone, { onDrop: this.uploadImage }),
          React.createElement(
            "button",
            { onClick: this.updateProfile },
            "Update Profile"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return CurrentUser;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    // Pass in the original and the changes (link changes to id)
    updateProfile: function (profile, updated) {
      return dispatch(actions.updateProfile(profile, updated));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(CurrentUser);
// Local state - only this component cares about