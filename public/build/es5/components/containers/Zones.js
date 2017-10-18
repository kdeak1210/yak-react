"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _presentation = require("../presentation/");

var Zone = _presentation.Zone;
var CreateZone = _presentation.CreateZone;
var APIManager = require("../../utils").APIManager;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var store = _interopRequire(require("../../stores/store"));

var Zones = (function (Component) {
  function Zones() {
    _classCallCheck(this, Zones);

    _get(Object.getPrototypeOf(Zones.prototype), "constructor", this).call(this);
    this.addZone = this.addZone.bind(this);
    this.selectZone = this.selectZone.bind(this);

    this.state = {};
  }

  _inherits(Zones, Component);

  _prototypeProperties(Zones, null, {
    componentDidMount: {
      value: function componentDidMount() {
        console.log("componentDidMount");
        this.props.fetchZones(null);
      },
      writable: true,
      configurable: true
    },
    addZone: {
      value: function addZone(zone) {
        var _this = this;
        // Making a copy, but we don't actually have to since this is no longer state
        var updatedZone = Object.assign({}, zone);

        APIManager.post("/api/zone", updatedZone, function (err, response) {
          if (err) {
            alert("ERROR: " + err.message);
            return;
          }

          _this.props.zoneCreated(response.result);
          // let updatedList = Object.assign([], this.state.list);
          // updatedList.push(response.result)
          // this.setState({
          //   list: updatedList
          // });
        });
      },
      writable: true,
      configurable: true
    },
    selectZone: {
      value: function selectZone(index) {
        this.props.selectZone(index);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;
        var zoneList = this.props.list.map(function (zone, i) {
          var selected = i == _this.props.selected;
          return React.createElement(
            "li",
            { key: i },
            React.createElement(Zone, { select: _this.selectZone,
              index: i,
              isSelected: selected,
              currentZone: zone })
          );
        });

        var content = null;
        if (this.props.appStatus == "loading") {
          content = "LOADING...";
        } else {
          content = React.createElement(
            "div",
            null,
            React.createElement(
              "ol",
              null,
              zoneList
            ),
            React.createElement(CreateZone, { onCreate: this.addZone })
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

  return Zones;
})(Component);

/** This tidbit and the export connect the store to the container */
var stateToProps = function (state) {
  return {
    // Grabbing these keys from the GLOBAL STORE, assigning to Zones props
    appStatus: state.zone.appStatus,
    list: state.zone.list,
    selected: state.zone.selectedZone
  };
};

/** Do this here bc its poor form to reference store within the component,
 * because then the component wouldn't be fully self-contained
 */
var dispatchToProps = function (dispatch) {
  return {
    fetchZones: function (params) {
      return dispatch(actions.fetchZones(params));
    },
    zonesReceived: function (zones) {
      return dispatch(actions.zonesReceived(zones));
    },
    zoneCreated: function (zone) {
      return dispatch(actions.zoneCreated(zone));
    },
    selectZone: function (index) {
      return dispatch(actions.selectZone(index));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Zones);
// selected: 0
// this.setState({
//   selected: index
// })