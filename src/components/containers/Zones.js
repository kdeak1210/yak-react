import React, { Component } from 'react';
import Zone from '../presentation/Zone';

class Zones extends Component {
  constructor(){
    super();

    this.updateZone = this.updateZone.bind(this);
    this.submitZone = this.submitZone.bind(this);

    this.state = {
      zone: {
        name: '',
        zipCode: ''
      },
      list: []
    }
  }

  updateZone(e){
    // This is a different pattern, lets us condense the methods into one
    let updatedZone = Object.assign({}, this.state.zone);
    updatedZone[e.target.id] = e.target.value;

    this.setState({
      zone: updatedZone
    });
  }

  submitZone(){
    let updatedList = Object.assign([], this.state.list);
    updatedList.push(this.state.zone);

    this.setState({
      list: updatedList
    });
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

        <input id="name" onChange={this.updateZone} className="form-control" type="text" placeholder="Zone name" /><br />
        <input id="zipCode" onChange={this.updateZone} className="form-control" type="text" placeholder="Zone name" /><br />
        <button onClick={this.submitZone} className="btn btn-danger">Submit Zone</button>        
      </div>
    );
  }
}

export default Zones;