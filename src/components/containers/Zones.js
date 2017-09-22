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
      selected: 0
    }
  }

  componentDidMount(){
    APIManager.get('/api/zone', null, (err, response) => {
      if (err) {
        alert('ERROR: ' + err.message);
        return;
      }
      // Dispatch an ACTION!
      const zones = response.results;
      //store.currentStore().dispatch(actions.zonesReceived(zones));
      
      // instead, dispatch the action like this but implement it outside class
      this.props.zonesReceived(zones);      
    });
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

  selectZone(selectedIndex){
    this.setState({
      selected: selectedIndex
    })
  }
  
  render(){    
    const zoneList = this.props.list.map((zone, i) => {
      let selected = (i == this.state.selected);
      return( 
        <li key={i}>
          <Zone select={this.selectZone} 
            index={i}
            isSelected={selected} 
            currentZone={zone} />
        </li>
      )
    });

    return(
      <div>
        <ol>
          {zoneList}                                          
        </ol>
          <CreateZone onCreate={this.addZone}/>        
      </div>
    );
  }
}

/** This tidbit and the export connect the store to the container */
const stateToProps = (state) => {
  return {
    // This key is now a prop called list on the component (FROM STORE STATE)
    list: state.zone.list
  }
}

/** Do this here bc its poor form to reference store within the component,
 * because then the component wouldn't be fully self-contained
 */
const dispatchToProps = (dispatch) => {
  return{
    zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
    zoneCreated: (zone) => dispatch(actions.zoneCreated(zone))
  }
}

export default connect(stateToProps, dispatchToProps)(Zones)