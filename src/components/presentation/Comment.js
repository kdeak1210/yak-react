import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ImageHelper } from '../../utils';

class Comment extends Component{
  render(){

    const currentComment = this.props.currentComment;
    const author = currentComment.author;
    const imgRadius = 20;

    return(
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
        <hr />
      </div>
    );
  }
}

export default Comment;