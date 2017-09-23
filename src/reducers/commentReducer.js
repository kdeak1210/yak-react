import constants from '../constants/constants';

var initialState = {
  // list: [],
  // commentsLoaded: false,
  map: {}
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state);      

  switch (action.type) {
    
    case constants.COMMENTS_RECEIVED:
      // console.log('comments received', JSON.stringify(action.comments))
      // console.log('comments received from zone: ', JSON.stringify(action.zone))      
      
      // updated['list'] = action.comments;

      let updatedMap = Object.assign({}, updated.map);
      
      let zoneComments = (updatedMap[action.zone._id]) ? 
          Object.assign([], updatedMap[action.zone._id]) : [];
      // let zoneComments = updatedMap[action.zone._id];
      // if (zoneComments == null) {
      //   zoneComments = [];
      // } else {
      //   zoneComments = Object.assign([], zoneComments);
      // }

      // iterate through comments from BackEnd, stick inside map based on zone
      action.comments.forEach((comment, i) => {
        zoneComments.push(comment);
      })

      updatedMap[action.zone._id] = zoneComments;
      updated['map'] = updatedMap;

      console.log('COMMENTS RECEIVED: ' , updated);

      return updated;

    case constants.SELECT_ZONE:
      // updated['commentsLoaded'] = false;
      return updated;

    case constants.COMMENT_CREATED:
      console.log('COMMENT CREATED: ' + JSON.stringify(action.comment))
      // let updatedList = Object.assign([], updated.list);
      // updatedList.push(action.comment);
      // updated['list'] = updatedList;

      return updated;

    default:
      return state;
  }
}