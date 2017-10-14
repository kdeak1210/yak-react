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

    case constants.PROFILE_UPDATED:
      console.log('PROFILE_UPDATED' + JSON.stringify(action.profile));
      if (action.profile._id != updated.user._id){
        // if the id's dont match, dont do anything
        return updated;
      }
      
      updated['user'] = action.profile;
      return updated;

    default:
      return state;
  }
}