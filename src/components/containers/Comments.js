import React, { Component } from 'react';
import Comment from '../presentation/Comment';
import styles from './styles';
import { APIManager } from '../../utils';

class Comments extends Component{
  constructor(){
    super();

    this.submitComment = this.submitComment.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateBody = this.updateBody.bind(this);

    this.state = {
      comment: {
        username: '',
        body: '',
      },
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

  submitComment(){
    APIManager.post('/api/comment', this.state.comment, (err, response) => {
      if (err) {
        alert(err);
        return;
      }
      console.log(JSON.stringify(response));
      let updatedList = Object.assign([], this.state.list)
      updatedList.push(response.result);

      this.setState({
        list: updatedList
      });
    });
  }

  updateUsername(e) {
    // this.state.comment['username'] = event.target.value // WRONG!
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['username'] = e.target.value;

    this.setState({
      comment: updatedComment
    });
  }

  updateBody(e){   
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment['body'] = e.target.value;

    this.setState({
      comment: updatedComment
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

          <input onChange={this.updateUsername} className="form-control" type="text" placeholder="Author" /><br />
          <input onChange={this.updateBody} className="form-control" type="text" placeholder="Comment Body" /><br />    
          <button onClick={this.submitComment} className="btn btn-info">Add Message</button>          
        </div> 
      </div>
    );
  }
}

export default Comments;