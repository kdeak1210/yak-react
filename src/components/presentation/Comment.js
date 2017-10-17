import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ImageHelper } from '../../utils';

class Comment extends Component{
  constructor(){
    super();
    this.state = {
      isEditing: false,
      updated: null
    }

    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateBody = this.updateBody.bind(this);
  }

  toggleEdit(event){
    event.preventDefault();
    if (this.state.isEditing){
      if (this.state.updated != null){  // If still null, no update was made
        this.props.onUpdate(this.props.currentComment, this.state.updated);
      }
    }
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  componentDidUpdate(){
    console.log('isEditing: ' + this.state.isEditing);
  }

  updateBody(event){
    console.log('updateBody: ' + event.target.value);
    this.setState({
      updated: event.target.value
    });
  }

  render(){
    const currentComment = this.props.currentComment;
    const author = currentComment.author;
    const imgRadius = 20;
    const editable = (this.props.isEditable) ? this.props.isEditable : false

    let content = null;
    if (this.state.isEditing == true){
      content = (
        <div>
          <textarea onChange={this.updateBody} defaultValue={currentComment.body} style={{width: 100+'%'}}></textarea>
          <br />

          <img style={{borderRadius: imgRadius, marginRight:6}} src={ImageHelper.thumbnail(author.image, imgRadius * 2)} />  
          <span style={{fontWeight: 200}}>
            <Link to={`/profile/${author.username}`}>{author.username}</Link>
          </span>
          <span style={{fontWeight: 200, margin:'0px 15px'}}>|</span>        
          <span style={{fontWeight: 200}}>{currentComment.timestamp}</span>
          <button style={{marginLeft:12}} onClick={this.toggleEdit}>Done</button>
          <hr />
        </div>
      );
    } else {
      content = (
        <div>
          <p style={{fontSize:20, fontWeight: 400}}>
            {currentComment.body}
          </p>

          <img style={{borderRadius: imgRadius, marginRight:6}} src={ImageHelper.thumbnail(author.image, imgRadius * 2)} />  
          <span style={{fontWeight: 200}}>
            <Link to={`/profile/${author.username}`}>{author.username}</Link>
          </span>
          <span style={{fontWeight: 200, margin:'0px 15px'}}>|</span>        
          <span style={{fontWeight: 200}}>{currentComment.timestamp}</span>
          { (editable) ? <button style={{marginLeft:12}} onClick={this.toggleEdit}>Edit</button> : null }
          <hr />
        </div>
      );
    }

    return (
      <div>
        { content }        
      </div>
    );
  }
}

export default Comment;