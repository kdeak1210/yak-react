import React, { Component } from 'react';
import Zone from '../presentation/Zone';
import { APIManager } from '../../utils';

class Zones extends Component {
  constructor(){
    super();

    this.updateZone = this.updateZone.bind(this);
    this.addZone = this.addZone.bind(this);

    this.state = {
      zone: {
        name: '',
        zipCodes: ''
      },
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

  updateZone(e){
    // This is a different pattern, lets us condense the methods into one
    let updatedZone = Object.assign({}, this.state.zone);
    updatedZone[e.target.id] = e.target.value;

    this.setState({
      zone: updatedZone
    });
  }

  addZone(){
    // Make a copy, then convert the string into an array and set to 'zipCodes'
    let updatedZone = Object.assign({}, this.state.zone);
    updatedZone['zipCodes'] = updatedZone.zipCode.split(',');

    APIManager.post('/api/zone', updatedZone, (err, response) => {
      if (err) {
        alert('ERROR: ' + err.message);
        return;
      }
      console.log('ZONE CREATED: ' + JSON.stringify(response));
      
      let updatedList = Object.assign([], this.state.list);
      updatedList.push(response.result)
      this.setState({
        list: updatedList
      });
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
        <button onClick={this.addZone} className="btn btn-danger">Submit Zone</button>        
      </div>
    );
  }
}

export default Zones;