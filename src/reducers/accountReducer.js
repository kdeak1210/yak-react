import constants from '../constants/constants';

var initialState = {
  /** Set the init user to null; NO ONE is logged in. if null is populated, then 
   * someone is logged in. null = NOTHING, as opposed to empty object */
  user: null
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state);
  switch (action.type){
    
    case constants.CURRENT_USER_RECEIVED:
      console.log('CURRENT_USER_RECEIVED' + JSON.stringify(action.user));
      updated['user'] = action.user;

      return updated;

    default:
      return state;
  }
}