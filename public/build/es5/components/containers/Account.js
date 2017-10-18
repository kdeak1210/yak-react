"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var Link = require("react-router-dom").Link;
var Account = (function (Component) {
  function Account() {
    _classCallCheck(this, Account);

    _get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      profile: {
        username: "",
        password: "",
        city: "",
        gender: ""
      }
    };
  }

  _inherits(Account, Component);

  _prototypeProperties(Account, null, {
    componentDidMount: {

      // Right when page shows up, make API call to check for currentuser
      value: function componentDidMount() {
        var _this = this;
        APIManager.get("/account/currentuser", null, function (err, response) {
          if (err) {
            // Not logged in, ignore error
            // alert(err.message);
            return;
          }

          console.log(JSON.stringify(response));
          _this.props.currentUserReceived(response.user);
        });
      },
      writable: true,
      configurable: true
    },
    updateProfile: {
      value: function updateProfile(e) {
        e.preventDefault();
        var updatedProfile = Object.assign({}, this.state.profile);
        updatedProfile[e.target.id] = e.target.value;
        this.setState({ profile: updatedProfile });
      },
      writable: true,
      configurable: true
    },
    login: {
      value: function login(e) {
        var _this = this;
        console.log(JSON.stringify(this.state.profile));
        if (this.state.profile.username.length == 0) {
          alert("Please enter a username");
          return;
        }
        if (this.state.profile.password.length == 0) {
          alert("Please enter a password");
          return;
        }

        // APIManager.post
        APIManager.post("/account/login", this.state.profile, function (err, response) {
          if (err) {
            alert(err.message);
            return;
          }
          console.log(JSON.stringify(response));

          _this.props.currentUserReceived(response.user);
        });
      },
      writable: true,
      configurable: true
    },
    signup: {
      value: function signup(e) {
        var _this = this;
        console.log(JSON.stringify(this.state.profile));
        if (this.state.profile.username.length == 0) {
          alert("Please enter a username");
          return;
        }
        if (this.state.profile.password.length == 0) {
          alert("Please enter a password");
          return;
        }

        // APIManager.post
        APIManager.post("/account/register", this.state.profile, function (err, response) {
          if (err) {
            alert(err.message);
            return;
          }
          console.log(JSON.stringify(response));
          _this.props.currentUserReceived(response.user);
        });
      },
      writable: true,
      configurable: true
    },
    logout: {
      value: function logout(e) {
        var _this = this;
        e.preventDefault();
        console.log("logout");

        APIManager.get("/account/logout", null, function (err, response) {
          if (err) {
            err.message;
            return;
          }
          console.log(JSON.stringify(response));
          // Send a null user through the action to set the use rin store to null
          _this.props.currentUserReceived(null);
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var content = null;
        if (this.props.user == null) {
          content = React.createElement(
            "div",
            null,
            React.createElement(
              "h2",
              null,
              "Login"
            ),
            React.createElement("input", { onChange: this.updateProfile, id: "username", type: "text", placeholder: "username" }),
            React.createElement("br", null),
            React.createElement("input", { onChange: this.updateProfile, id: "password", type: "password", placeholder: "password" }),
            React.createElement("br", null),
            React.createElement(
              "button",
              { onClick: this.login },
              "Log In"
            ),
            React.createElement("br", null),
            React.createElement(
              "h2",
              null,
              "Sign Up"
            ),
            React.createElement("input", { onChange: this.updateProfile, id: "username", type: "text", placeholder: "username" }),
            React.createElement("br", null),
            React.createElement("input", { onChange: this.updateProfile, id: "password", type: "password", placeholder: "password" }),
            React.createElement("br", null),
            React.createElement("input", { onChange: this.updateProfile, id: "city", type: "text", placeholder: "city" }),
            React.createElement("br", null),
            React.createElement("input", { onChange: this.updateProfile, id: "gender", type: "text", placeholder: "gender" }),
            React.createElement("br", null),
            React.createElement(
              "button",
              { onClick: this.signup },
              "Join"
            )
          );
        } else {
          content = React.createElement(
            "div",
            null,
            React.createElement("img", { style: { borderRadius: 48, float: "left", marginRight: 12 },
              src: ImageHelper.thumbnail(this.props.user.image, 72) }),
            React.createElement(
              "h2",
              null,
              "Welcome ",
              this.props.user.username,
              "!"
            ),
            React.createElement(
              "span",
              null,
              this.props.user.city
            ),
            React.createElement("br", null),
            React.createElement(
              "button",
              { onClick: this.logout },
              "Logout"
            ),
            React.createElement(
              Link,
              { to: "/currentuser" },
              React.createElement(
                "button",
                null,
                "Account"
              )
            )
          );
        }

        return React.createElement(
          "div",
          null,
          content
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Account;
})(Component);

// returns a JSON object
var stateToProps = function (state) {
  return {
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    currentUserReceived: function (user) {
      return dispatch(actions.currentUserReceived(user));
    } };
};

module.exports = connect(stateToProps, dispatchToProps)(Account);