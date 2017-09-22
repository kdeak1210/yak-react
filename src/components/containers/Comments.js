import React, { Component } from 'react';
import { CreateComment, Comment } from '../presentation';
import styles from './styles';
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

class Comments extends Component{
  constructor(){
    super();
    this.submitComment = this.submitComment.bind(this);

    this.state = {
      // list: []
    }
  }

  componentDidMount(){
    APIManager.get('/api/comment', null, (err, response) => {
      if (err) {
        console.log('ERROR: ' + err.message);
        return;
      }
      this.props.commentsReceived(response.results);
      
      // this.setState({
      //   list: response.results
      // })
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
    const commentItems = this.props.comments.map((comment, i) => {
      return <li key={i}><Comment currentComment={comment}/></li>
    });

    const selectedZone = this.props.zones[this.props.index];
    const zoneName = (selectedZone==null) ? '' : selectedZone.name
    

    return(
      <div>
        <h2>{zoneName}</h2>
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

const stateToProps = (state) => {
  return {
    /* Comments container CARES about the index (selectedZone)
     so we should register that value with the comments container*/
    index: state.zone.selectedZone,
    zones: state.zone.list,
    comments: state.comment.list
  }
}

const dispatchToProps = (dispatch) => {
  return {
    commentsReceived: (comments) => dispatch(actions.commentsReceived(comments))
  }
}

export default connect(stateToProps, dispatchToProps)(Comments);