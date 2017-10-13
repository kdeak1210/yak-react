import React, { Component } from 'react';
import { Zone, CreateZone } from '../presentation/';
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import store from '../../stores/store';

class Zones extends Component {
  constructor(){
    super();
    this.addZone = this.addZone.bind(this);
    this.selectZone = this.selectZone.bind(this);

    this.state = {
      // selected: 0
    }
  }

  componentDidMount(){
    console.log('componentDidMount');
    this.props.fetchZones(null);
  }

  addZone(zone){
    // Making a copy, but we don't actually have to since this is no longer state
    let updatedZone = Object.assign({}, zone);

    APIManager.post('/api/zone', updatedZone, (err, response) => {
      if (err) {
        alert('ERROR: ' + err.message);
        return;
      }      
      
      this.props.zoneCreated(response.result);
      // let updatedList = Object.assign([], this.state.list);
      // updatedList.push(response.result)
      // this.setState({
      //   list: updatedList
      // });
    });
  }

  selectZone(index){
    this.props.selectZone(index)
    // this.setState({
    //   selected: index
    // })
  }
  
  render(){    
    const zoneList = this.props.list.map((zone, i) => {
      let selected = (i == this.props.selected);
      return( 
        <li key={i}>
          <Zone select={this.selectZone} 
            index={i}
            isSelected={selected} 
            currentZone={zone} />
        </li>
      )
    });

    let content = null;
    if (this.props.appStatus == 'loading'){
      content = 'LOADING...'
    } else {
      content = (
        <div>
          <ol>
            {zoneList}
          </ol>
          <CreateZone onCreate={this.addZone}/>
        </div>
      )
    }

    return(
      <div>
        {content}        
      </div>
    );
  }
}

/** This tidbit and the export connect the store to the container */
const stateToProps = (state) => {
  return {
    // Grabbing these keys from the GLOBAL STORE, assigning to Zones props
    appStatus: state.zone.appStatus,
    list: state.zone.list,
    selected: state.zone.selectedZone
  }
}

/** Do this here bc its poor form to reference store within the component,
 * because then the component wouldn't be fully self-contained
 */
const dispatchToProps = (dispatch) => {
  return{
    fetchZones: (params) => dispatch(actions.fetchZones(params)),
    zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
    zoneCreated: (zone) => dispatch(actions.zoneCreated(zone)),
    selectZone: (index) => dispatch(actions.selectZone(index))
  }
}

export default connect(stateToProps, dispatchToProps)(Zones)