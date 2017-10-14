import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

class CurrentUser extends Component {
  constructor(){
    super();
    this.state = {
      updated: {
        // Local state - only this component cares about
      }
    }

    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }
  
  componentDidMount(){
    console.log('componentDidMount: ' + JSON.stringify(this.props.user));
  }

  updateCurrentUser(e){
    e.preventDefault()
    // console.log('updateCurrentUser: ', e.target.value);
    let updatedProfile = Object.assign({}, this.state.updated);
    updatedProfile[e.target.id] = e.target.value;

    this.setState({
      updated: updatedProfile
    });
  }

  updateProfile(e){
    e.preventDefault();
    console.log('Update Profile: ', this.state.updated);

    if (Object.keys(this.state.updated).length == 0){
      alert('No Changes Made!!!');
      return;
    }

    this.props.updateProfile(this.props.user, this.state.updated);
  }

  render(){
    const currentUser = this.props.user;

    return(
      <div>
        <h2>Welcome { currentUser.username }</h2>
        <input type="text" id="username" onChange={this.updateCurrentUser} defaultValue={currentUser.username} placeholder="Username" /><br/>
        <input type="text" id="gender" onChange={this.updateCurrentUser} defaultValue={currentUser.gender} placeholder="Gender" /><br/>
        <input type="text" id="city" onChange={this.updateCurrentUser} defaultValue={currentUser.city} placeholder="City" /><br/> 
        <button onClick={this.updateProfile}>Update Profile</button>       
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    // Pass in the original and the changes (link changes to id)
    updateProfile: (profile, updated) => dispatch(actions.updateProfile(profile, updated))
  }
}

export default connect(stateToProps, dispatchToProps)(CurrentUser);