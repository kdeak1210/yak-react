import React, { Component } from 'react';
import { APIManager } from '../../utils';

class Profile extends Component{
  constructor(){
    super()
    this.state = {
      profile: null
    }
  }

  componentDidMount(){
    console.log('componentDidMount: ' + this.props.username);

    APIManager.get('/api/profile', {username: this.props.username}, (err, response) => {
      if (err){
        alert(err);
        return;
      }

      //console.log(response.results[0]);
      if (response.results.length == 0){
        alert('Profile Not Found');
        return;
      }

      const profile = response.results[0];
      this.setState({
        profile: profile
      });
    });
  }

  render(){
    const header = (this.state.profile == null) ? null :
      <h3>{this.state.profile._id}</h3>
    
    return(
      <div>
        {header}
      </div>
    )
  }
}

export default Profile;