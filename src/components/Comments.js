import React, { Component } from 'react';
import Comment from './Comment';
import styles from './styles';

class Comments extends Component{
  constructor(){
    super();

    this.state = {
      list: [
        {username: 'dtrump', body: 'We president now', timestamp:'10:30'},
        {username: 'hclinton', body: 'We not president now', timestamp:'10:45'},
        {username: 'gjohnson', body: 'Aleppo', timestamp:'11:30'},        
      ]
    }
  }
  
  render(){

    const commentItems = this.state.list.map((comment, i) => {
      return <li key={i}><Comment currentComment={comment}/></li>
    });

    return(
      <div>
        <h2>Comments: Zone 1</h2>
        <div style={styles.comment.commentsBox}>
          <ul style={styles.comment.commentsList}>
            {commentItems}
          </ul>
        </div> 
      </div>
    );
  }
}

export default Comments;