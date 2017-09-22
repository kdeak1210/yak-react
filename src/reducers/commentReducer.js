import constants from '../constants/constants';

var initialState = {
  commentsLoaded: false,
  list: []
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state);      

  switch (action.type) {
    
    case constants.COMMENTS_RECEIVED:
      // console.log('comments received', JSON.stringify(action.comments))
      updated['list'] = action.comments;
      updated['commentsLoaded'] = true;
      return updated;

    case constants.SELECT_ZONE:
      updated['commentsLoaded'] = false;
      return updated;

    case constants.COMMENT_CREATED:
      let updatedList = Object.assign([], updated.list);
      updatedList.push(action.comment);
      updated['list'] = updatedList;
      return updated;

    default:
      return state;
  }
}