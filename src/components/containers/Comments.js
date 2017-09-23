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
      commentsLoaded: false,
      index: 0
    }
  }

  componentDidMount(){
    // let zone = this.props.zones[this.props.index];
    // if (zone == null){
    //   // until the API call comes back, there are NO selected zones
    //   console.log('NO SELECTED ZONE');
    //   return;
    // }    

    // APIManager.get('/api/comment', {zone: zone._id}, (err, response) => {
    //   if (err) {
    //     console.log('ERROR: ' + err.message);
    //     return;
    //   }
    //   this.props.commentsReceived(response.results);

    // });
  }

  submitComment(comment){
    // copy the comment passed to the function
    let updatedComment = Object.assign({}, comment);

    // Assign currently selected zone's id to comment before sending it up
    let zone = this.props.zones[this.props.index];
    updatedComment['zone'] = zone._id

    console.log(updatedComment);
    APIManager.post('/api/comment', updatedComment, (err, response) => {
      if (err) {
        alert(err);
        return;
      }

      console.log(JSON.stringify(response));
      const comment = response.result;
      this.props.commentCreated(comment);
      // let updatedList = Object.assign([], this.state.list)
      // updatedList.push(response.result);
      // this.setState({
      //   list: updatedList
      // });
    });
  }

  componentWillUpdate(){

  }

  /** Triggers everytime theres a change to the store */
  componentDidUpdate(){
    console.log('COMMENTS CONTAINER: componenetDidUpdate');
    let zone = this.props.zones[this.props.index];
    if (zone == null){
      console.log('NO SELECTED ZONE');
      return;
    }

    // console.log('Selected zone is ready');
    // if (this.props.commentsLoaded == true) 
    //   return;
    
    let commentsArray = this.props.commentsMap[zone._id];
    if (commentsArray != null) {
      // comments for zone already loaded, no need for API call
      return;
    }

    APIManager.get('/api/comment', {zone: zone._id}, (err, response) => {
      if (err) {
        console.log('ERROR: ' + err.message);
        return;
      }

      let comments = response.results;
      this.props.commentsReceived(comments, zone);
    });

  }
  
  render(){
    const selectedZone = this.props.zones[this.props.index];
    
    let zoneName, commentList = null;

    if (selectedZone != null) {
      zoneName = selectedZone.name;

      let zoneComments = this.props.commentsMap[selectedZone._id];    
      if (zoneComments != null) {
        commentList = zoneComments.map((comment, i) => {
          return (
            <li key={i}><Comment currentComment={comment} /></li>
          );
        });
      }
    }

    return (
      <div>
        <h2>{zoneName}</h2>
        <div style={styles.comment.commentsBox}>
          <ul style={styles.comment.commentsList}>
            { commentList }
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
    // comments: state.comment.list,
    commentsMap: state.comment.map,
    commentsLoaded: state.comment.commentsLoaded,
  }
}

const dispatchToProps = (dispatch) => {
  return {
    commentsReceived: (comments, zone) => dispatch(actions.commentsReceived(comments, zone)),
    commentCreated: (comment) => dispatch(actions.commentCreated(comment))
  }
}

export default connect(stateToProps, dispatchToProps)(Comments);