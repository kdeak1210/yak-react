import React, { Component } from 'react';
import { Zone, CreateZone } from '../presentation/';
import { APIManager } from '../../utils';

class Zones extends Component {
  constructor(){
    super();
    this.addZone = this.addZone.bind(this);
    this.selectZone = this.selectZone.bind(this);

    this.state = {
      selected: 0,
      list: []
    }
  }

  componentDidMount(){
    APIManager.get('/api/zone', null, (err, response) => {
      if (err) {
        alert('ERROR: ' + err.message);
        return;
      }
      this.setState({
        list: response.results
      })
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
      
      let updatedList = Object.assign([], this.state.list);
      updatedList.push(response.result)
      this.setState({
        list: updatedList
      });
    });
  }

  selectZone(selectedIndex){
    this.setState({
      selected: selectedIndex
    })
  }
  
  render(){    
    const zoneList = this.state.list.map((zone, i) => {
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

export default Zones;