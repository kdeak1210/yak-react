"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _presentation = require("../presentation");

var CreateComment = _presentation.CreateComment;
var Comment = _presentation.Comment;
var styles = _interopRequire(require("./styles"));

var APIManager = require("../../utils").APIManager;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var Comments = (function (Component) {
  function Comments() {
    _classCallCheck(this, Comments);

    _get(Object.getPrototypeOf(Comments.prototype), "constructor", this).call(this);
    this.submitComment = this.submitComment.bind(this);
    this.updateComment = this.updateComment.bind(this);

    this.state = {
      // list: []
      commentsLoaded: false,
      index: 0
    };
  }

  _inherits(Comments, Component);

  _prototypeProperties(Comments, null, {
    componentDidMount: {
      value: function componentDidMount() {},
      writable: true,
      configurable: true
    },
    submitComment: {
      value: function submitComment(comment) {
        var _this = this;
        if (this.props.user == null) {
          // Leave the comment form there and instead encourage the user to sign in
          alert("Please Sign up or Login to Comment");
          return;
        }

        // copy the comment passed to the function
        var updatedComment = Object.assign({}, comment);

        // Assign currently selected zone's id to comment before sending it up
        var zone = this.props.zones[this.props.index];
        updatedComment.zone = zone._id;
        updatedComment.author = {
          username: this.props.user.username,
          id: this.props.user._id,
          image: this.props.user.image
        };

        console.log(updatedComment);
        APIManager.post("/api/comment", updatedComment, function (err, response) {
          if (err) {
            alert(err);
            return;
          }

          console.log(JSON.stringify(response));
          var comment = response.result;
          _this.props.commentCreated(comment);
        });
      },
      writable: true,
      configurable: true
    },
    componentDidUpdate: {

      /** Triggers everytime theres a change to the store */
      value: function componentDidUpdate() {
        var _this = this;
        // console.log('COMMENTS CONTAINER: componenetDidUpdate');
        var zone = this.props.zones[this.props.index];
        if (zone == null) {
          console.log("NO SELECTED ZONE");
          return;
        }

        // console.log('Selected zone is ready');
        // if (this.props.commentsLoaded == true)
        //   return;

        var commentsArray = this.props.commentsMap[zone._id];
        if (commentsArray != null) {
          // comments for zone already loaded, no need for API call
          return;
        }

        APIManager.get("/api/comment", { zone: zone._id }, function (err, response) {
          if (err) {
            console.log("ERROR: " + err.message);
            return;
          }

          var comments = response.results;
          _this.props.commentsReceived(comments, zone);
        });
      },
      writable: true,
      configurable: true
    },
    updateComment: {
      value: function updateComment(comment, updatedBody) {
        console.log("update comment: " + comment._id + ", " + updatedBody);
        this.props.updateComment(comment, { body: updatedBody });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;
        var selectedZone = this.props.zones[this.props.index];
        var currentUser = this.props.user; // null means not logged in

        var zoneName = undefined,
            commentList = null;

        if (selectedZone != null) {
          zoneName = selectedZone.name;

          var zoneComments = this.props.commentsMap[selectedZone._id];
          if (zoneComments != null) {
            commentList = zoneComments.map(function (comment, i) {
              var editable = false;
              if (currentUser != null) {
                editable = currentUser._id == comment.author.id;
              }
              return React.createElement(
                "li",
                { key: i },
                React.createElement(Comment, { onUpdate: _this.updateComment, isEditable: editable, currentComment: comment })
              );
            });
          }
        }

        return React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            null,
            zoneName
          ),
          React.createElement(
            "div",
            { style: styles.comment.commentsBox },
            React.createElement(
              "ul",
              { style: styles.comment.commentsList },
              commentList
            ),
            React.createElement(CreateComment, { onCreate: this.submitComment })
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Comments;
})(Component);

var stateToProps = function (state) {
  return {
    /* Comments container CARES about the index (selectedZone)
     so we should register that value with the comments container*/
    index: state.zone.selectedZone,
    zones: state.zone.list,
    // comments: state.comment.list,
    commentsMap: state.comment.map,
    commentsLoaded: state.comment.commentsLoaded,

    // Connect the current user to Comments props...
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    commentsReceived: function (comments, zone) {
      return dispatch(actions.commentsReceived(comments, zone));
    },
    commentCreated: function (comment) {
      return dispatch(actions.commentCreated(comment));
    },
    updateComment: function (comment, params) {
      return dispatch(actions.updateComment(comment, params));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Comments);
// let zone = this.props.zones[this.props.index];
// if (zone == null){
//   // until the API call comes back, there are NO selected zones
//   console.log('NO SELECTED ZONE');
//   return;
// }   

// APIManager.get('/api/comment', {zone: zone._id}, (err, response) => {
//   if (err) {
//     console.log('ERROR: ' + err.message);
//     return;
//   }
//   this.props.commentsReceived(response.results);

// });