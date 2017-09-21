import React, { Component } from 'react';
import { CreateComment, Comment } from '../presentation';
import styles from './styles';
import { APIManager } from '../../utils';

class Comments extends Component{
  constructor(){
    super();
    this.submitComment = this.submitComment.bind(this);

    this.state = {
      list: []
    }
  }

  componentDidMount(){
    APIManager.get('/api/comment', null, (err, response) => {
      if (err) {
        console.log('ERROR: ' + err.message);
        return;
      }
      this.setState({
        list: response.results
      })
    });
  }

  submitComment(comment){
    // copy the comment passed to the function
    let updatedComment = Object.assign({}, comment);

    APIManager.post('/api/comment', updatedComment, (err, response) => {
      if (err) {
        alert(err);
        return;
      }
      let updatedList = Object.assign([], this.state.list)
      updatedList.push(response.result);
      this.setState({
        list: updatedList
      });
    });
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
          <CreateComment onCreate={this.submitComment}/>
        </div> 
      </div>
    );
  }
}

export default Comments;