"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var CreateZone = (function (Component) {
  function CreateZone() {
    _classCallCheck(this, CreateZone);

    _get(Object.getPrototypeOf(CreateZone.prototype), "constructor", this).call(this);
    this.updateZone = this.updateZone.bind(this);
    this.submitZone = this.submitZone.bind(this);

    this.state = {
      zone: {
        name: "",
        zipCode: ""
      }
    };
  }

  _inherits(CreateZone, Component);

  _prototypeProperties(CreateZone, null, {
    updateZone: {
      value: function updateZone(event) {
        var updatedZone = Object.assign({}, this.state.zone);
        updatedZone[event.target.id] = event.target.value;
        this.setState({
          zone: updatedZone
        });
      },
      writable: true,
      configurable: true
    },
    submitZone: {
      value: function submitZone() {
        // Handle the zipCodes preprocessing here, before passing it up
        var updated = Object.assign({}, this.state.zone);
        updated.zipCodes = updated.zipCode.split(",");
        this.props.onCreate(updated);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            null,
            "Create Zone"
          ),
          React.createElement("input", { onChange: this.updateZone,
            id: "name",
            className: "form-control",
            type: "text",
            placeholder: "Zone name" }),
          React.createElement("br", null),
          React.createElement("input", { onChange: this.updateZone,
            id: "zipCode",
            className: "form-control",
            type: "text",
            placeholder: "Zone Zipcode" }),
          React.createElement("br", null),
          React.createElement(
            "button",
            { onClick: this.submitZone, className: "btn btn-danger" },
            "Submit Zone"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return CreateZone;
})(Component);

module.exports = CreateZone;