import React, { Component } from 'react';

class CreateComment extends Component{
  constructor(){
    super();
    this.updateComment = this.updateComment.bind(this);
    this.submitComment = this.submitComment.bind(this);

    this.state = {
      comment: {
        body: ''
      }
    }
  }

  updateComment(event){
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment[event.target.id] = event.target.value;
    this.setState({
      comment: updatedComment
    });
  }

  submitComment(){
    this.props.onCreate(this.state.comment);
  }
  
  render(){
    return(
      <div>
        <h3>Create Comment</h3>
        <input onChange={this.updateComment} 
          id="body"
          className="form-control" 
          type="text" 
          placeholder="Comment Body" /><br />    
        <button onClick={this.submitComment} 
          className="btn btn-info">Add Message</button>          
      </div>
    );
  }
}

export default CreateComment;