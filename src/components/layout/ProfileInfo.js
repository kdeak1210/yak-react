import React, { Component } from 'react';
import { Profile } from '../containers';

class ProfileInfo extends Component{
  
  componentDidMount(){
    // React Router auto passes in some props, including params
    console.log('componentDidMount: ', this.props);
    
  }
  
  render(){
    return(
      <div>
        Profile Info Layout

        <Profile username={this.props.match.params.username}/>
      </div>
    )
  }
}

export default ProfileInfo;