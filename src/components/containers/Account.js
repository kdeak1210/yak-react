import React, { Component } from 'react';
import { APIManager } from '../../utils';

class Account extends Component{
  constructor(){
    super();
    this.updateProfile = this.updateProfile.bind(this);
    this.signup = this.signup.bind(this);

    this.state = {
      profile: {
        username: '',
        password: ''
      }
    }
  }

  updateProfile(e){
    e.preventDefault();
    let updatedProfile = Object.assign({}, this.state.profile);
    updatedProfile[e.target.id] = e.target.value;
    this.setState({ profile: updatedProfile });
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
    APIManager.post('/api/profile', this.state.profile, (err, response) => {
      if (err){
        alert(err.message);
        return;
      }
      console.log(JSON.stringify(response));
    });

  }
  
  render(){
    return(
      <div>
        <h2>Login</h2>
        <input onChange={this.updateProfile} id="username" type="text" placeholder="username" /><br />
        <input onChange={this.updateProfile} id="password" type="password" placeholder="password" /><br />
        <button>Log In</button> 
        <br />      
        <h2>Sign Up</h2>
        <input onChange={this.updateProfile} id="username" type="text" placeholder="username" /><br />
        <input onChange={this.updateProfile} id="password" type="password" placeholder="password" /><br />
      <button onClick={this.signup}>Join</button>      
    </div>
    );
  }
}

export default Account;