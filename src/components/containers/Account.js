import React, { Component } from 'react';
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

class Account extends Component{
  constructor(){
    super();
    this.updateProfile = this.updateProfile.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      profile: {
        username: '',
        password: '',
        city: '',
        gender: ''
      }
    }
  }

  // Right when page shows up, make API call to check for currentuser
  componentDidMount(){
    APIManager.get('/account/currentuser', null, (err, response) => {
      if (err){
        // Not logged in, ignore error
        // alert(err.message);
        return;
      }

      console.log(JSON.stringify(response));
      this.props.currentUserReceived(response.user);
    });
  }

  updateProfile(e){
    e.preventDefault();
    let updatedProfile = Object.assign({}, this.state.profile);
    updatedProfile[e.target.id] = e.target.value;
    this.setState({ profile: updatedProfile });
  }

  login(e){
    console.log(JSON.stringify(this.state.profile));    
    if (this.state.profile.username.length == 0){
      alert('Please enter a username');
      return;
    }
    if (this.state.profile.password.length == 0){
      alert('Please enter a password');
      return;
    }

    // APIManager.post
    APIManager.post('/account/login', this.state.profile, (err, response) => {
      if (err){
        alert(err.message);
        return;
      }
      console.log(JSON.stringify(response));
      
      this.props.currentUserReceived(response.user);
    });
  }

  signup(e){
    console.log(JSON.stringify(this.state.profile));
    if (this.state.profile.username.length == 0){
      alert('Please enter a username');
      return;
    }
    if (this.state.profile.password.length == 0){
      alert('Please enter a password');
      return;
    }

    // APIManager.post
    APIManager.post('/account/register', this.state.profile, (err, response) => {
      if (err){
        alert(err.message);
        return;
      }
      console.log(JSON.stringify(response));
      this.props.currentUserReceived(response.user);
    });
  }

  logout(e){
    e.preventDefault();
    console.log('logout');

    APIManager.get('/account/logout', null, (err, response) => {
      if (err){
        (err.message);
        return;
      }
      console.log(JSON.stringify(response));
      // Send a null user through the action to set the use rin store to null
      this.props.currentUserReceived(null);
    })
  }
  
  render(){
    let content = null;
    if (this.props.user == null) {
      content = (
        <div>
          <h2>Login</h2>
          <input onChange={this.updateProfile} id="username" type="text" placeholder="username" /><br />
          <input onChange={this.updateProfile} id="password" type="password" placeholder="password" /><br />
          <button onClick={this.login}>Log In</button> 
          <br />      
          <h2>Sign Up</h2>
          <input onChange={this.updateProfile} id="username" type="text" placeholder="username" /><br />
          <input onChange={this.updateProfile} id="password" type="password" placeholder="password" /><br />
          <input onChange={this.updateProfile} id="city" type="text" placeholder="city" /><br />
          <input onChange={this.updateProfile} id="gender" type="text" placeholder="gender" /><br />          
          <button onClick={this.signup}>Join</button>      
        </div>
      )
    } else {
      content = (
        <div>
          <h2>Welcome {this.props.user.username}!</h2>
          <button onClick={this.logout}>Logout</button>
        </div>
      ) 
    }

    return(
      <div>
        { content }        
      </div>
    );
  }
}

// returns a JSON object
const stateToProps = (state) => {
  return {
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    currentUserReceived: (user) => dispatch(actions.currentUserReceived(user)),
  }
}

export default connect(stateToProps, dispatchToProps) (Account);