import constants from '../constants/constants';

var initialState = {
  list: []
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state);

  switch (action.type){
    case constants.PROFILE_RECEIVED:
      console.log('PROFILE_RECEIVED ' + JSON.stringify(action.profile));
      // instantiate a new array (bc otherwise setting an array onto an object)
      let updatedList = Object.assign([], state.list);
      updatedList.push(action.profile);
      updated['list'] = updatedList;

      return updated;

    default:
      return state;
  }

}