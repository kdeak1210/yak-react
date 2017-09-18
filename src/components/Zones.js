import React, { Component } from 'react';
import Zone from './Zone';

class Zones extends Component {
  constructor(){
    super();

    this.state = {
      list: [
        {name: 'Zone 1', zipCode: '10013', comments: 20},
        {name: 'Zone 2', zipCode: '10014', comments: 30},
        {name: 'Zone 3', zipCode: '10015', comments: 40},
        {name: 'Zone 4', zipCode: '10016', comments: 50},
        {name: 'Zone 5', zipCode: '10017', comments: 60}        
      ]
    }
  }
  
  render(){
    
    const zoneList = this.state.list.map((zone, i) => {
      return <li key={i}><Zone currentZone={zone} /></li>
    });

    return(
      <div>
        <ol>
          {zoneList}                                          
        </ol>
      </div>
    );
  }
}

export default Zones;