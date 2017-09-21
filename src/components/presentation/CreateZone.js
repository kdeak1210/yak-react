import React, { Component } from 'react';

class CreateZone extends Component {
  constructor(){
    super();
    this.updateZone = this.updateZone.bind(this);
    this.submitZone = this.submitZone.bind(this);

    this.state = {
      zone: {
        name: '',
        zipCode: ''
      }
    };
  }

  updateZone(event){
    let updatedZone = Object.assign({}, this.state.zone);
    updatedZone[event.target.id] = event.target.value;
    this.setState({
      zone: updatedZone
    });
  }

  submitZone(){
    // Handle the zipCodes preprocessing here, before passing it up
    let updated = Object.assign({}, this.state.zone);
    updated['zipCodes'] = updated.zipCode.split(',');
    this.props.onCreate(updated);
  }
  
  render(){
    return(
      <div>
        <h3>Create Zone</h3>
        <input onChange={this.updateZone} 
          id="name"
          className="form-control" 
          type="text" 
          placeholder="Zone name" /><br />
        <input onChange={this.updateZone} 
          id="zipCode"
          className="form-control" 
          type="text" 
          placeholder="Zone Zipcode" /><br />
        <button onClick={this.submitZone} className="btn btn-danger">Submit Zone</button>
      </div>
    );
  }
}

export default CreateZone;