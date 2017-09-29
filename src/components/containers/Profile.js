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
      this.props.profileReceived(profile);

    });
  }

  render(){
    console.log(this.props);
    const profile = this.props.profiles[0];
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
    
    return(
      <div>
        {header}
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    profiles: state.profile.list
  }
}

const dispatchToProps = (dispatch) => {
  return {
    profileReceived: (profile) => dispatch(actions.profileReceived(profile))
  }
}

export default connect(stateToProps, dispatchToProps)(Profile);