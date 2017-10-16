import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import Dropzone from 'react-dropzone';
import { APIManager } from '../../utils';
import sha1 from 'sha1';

class CurrentUser extends Component {
  constructor(){
    super();
    this.state = {
      updated: {
        // Local state - only this component cares about
      }
    }
    this.uploadImage = this.uploadImage.bind(this);
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

  // Function interacting w/ Dropzone, takes array of files (i only need one)
  uploadImage(files){
    const image = files[0];

    const cloudName = 'hrh27qwfe';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    let timestamp = Date.now() / 1000;
    const uploadPreset = 'yistkhgi';

    /* Create Special signature for request params
    https://cloudinary.com/documentation/upload_images#creating_api_authentication_signatures
    */
    const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}d0uEXCZQ9ekXgk12quxraGKwHqE`
    const signature = sha1(paramsStr);

    /* Required parameters for authenticated requests to Cloudinary API
    https://cloudinary.com/documentation/upload_images#uploading_with_a_direct_call_to_the_api
    */
    const params = {
      'api_key': '763811365227231',
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }

    console.log('uploadImage: ', image);

    APIManager.upload(url, image, params, (err, response) => {
      if (err){
        alert(err);
        return;
      }
      //console.log('UPLOAD COMPLETE: ' + JSON.stringify(response.body));

      let updatedProfile = Object.assign({}, this.state.updated);
      updatedProfile['image'] = response.body['secure_url'];
      this.setState({
        updated: updatedProfile
      });
    });
  }

  render(){
    const currentUser = this.props.user;
    const image = (this.state.updated.image == null) ? '' : 
      this.state.updated.image.replace('upload', 'upload/c_thumb,h_150,w_150'); // render thumbnail size

    return(
      <div>
        <h2>Welcome { currentUser.username }</h2>
        <input type="text" id="username" onChange={this.updateCurrentUser} defaultValue={currentUser.username} placeholder="Username" /><br/>
        <input type="text" id="gender" onChange={this.updateCurrentUser} defaultValue={currentUser.gender} placeholder="Gender" /><br/>
        <input type="text" id="city" onChange={this.updateCurrentUser} defaultValue={currentUser.city} placeholder="City" /><br/> 
        <img src={image} /><br />
        <Dropzone onDrop={this.uploadImage} />
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