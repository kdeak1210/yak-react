import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Comment extends Component{
  render(){

    const currentComment = this.props.currentComment;

    return(
      <div>
        <p style={{fontSize:20, fontWeight: 400}}>
          {currentComment.body}
        </p>        
        <span style={{fontWeight: 200}}>
          <Link to={`/profile/${currentComment.username}`}>{currentComment.username}</Link>
        </span>
        <span style={{fontWeight: 200, margin:'0px 15px'}}>|</span>        
        <span style={{fontWeight: 200}}>{currentComment.timestamp}</span>
        <hr />                
      </div>
    );
  }
}

export default Comment;