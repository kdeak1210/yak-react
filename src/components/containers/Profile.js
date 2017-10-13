import React, { Component } from 'react';
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

class Profile extends Component{
  constructor(){
    super()
    this.state = {
      // profile: null
    }
  }

  componentDidMount(){
    console.log('componentDidMount: ' + this.props.username);
    const profile = this.props.profiles[this.props.username];

    if (profile != null) {  // profile already loaded, dont do API call
      return;
    }
    // Call the action created for fetch profile to do API call
    this.props.fetchProfile({username: this.props.username});

    // First time nav to the page, so make the API call
    // APIManager.get('/api/profile', {username: this.props.username}, (err, response) => {
    //   if (err){
    //     alert(err);
    //     return;
    //   }
    //   console.log("API CALL", response.results[0]);
    //   if (response.results.length == 0){
    //     alert('Profile Not Found');
    //     return;
    //   }
    //   const profile = response.results[0];
    //   this.props.profileReceived(profile);
    // });
  }

  componentDidUpdate(){
  
  }

  render(){
    const profile = this.props.profiles[this.props.username];
    
    let header = null;  
    if (profile != null){
      header = (
        <div>
          <h3>{profile.username}</h3>
          <p>
            city: {profile.city} <br/>
            gender: {profile.gender} <br/>
          </p>
        </div> 
      );
    }
    
    const content = (this.props.appStatus == 'loading') ? 'Loading...' : header
    return(
      <div>
        {content}
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    profiles: state.profile.map,
    appStatus: state.profile.appStatus
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchProfile: (params) => dispatch(actions.fetchProfile(params)),
    // profileReceived: (profile) => dispatch(actions.profileReceived(profile))
  }
}

export default connect(stateToProps, dispatchToProps)(Profile);