import constants from '../constants/constants';

/** Reducer maintains the data for a specific data type (Zones) */

var initialState = {
  selectedZone: 0,
  list: [],
  appStatus: 'ready'
}

/** Receives actions. when an action dispatched, this function gets
 * triggered. Inside, we decide what to do with the data...
 */
export default (state = initialState, action) => {

  let updated = Object.assign({}, state); 

  switch (action.type){

    case constants.ZONES_RECEIVED:
      // Take zones payload, assign it to list value of the reducer (the state)
      updated['list'] = action.zones;
      updated['appStatus'] = 'ready';
      return updated; // return updated is fundamentally  same as this.setState

    case constants.ZONE_CREATED:     
      // Need to force a DEEP copy of the list (first copy is shallow)
      let updatedList = Object.assign([], updated.list);
      updatedList.push(action.zone);
      
      updated['list'] = updatedList;
      return updated;

    case constants.SELECT_ZONE:
      updated['selectedZone'] = action.selectedZone;
      return updated;

    case constants.APPLICATION_STATE:
      if (action.reducer != 'zone'){
        return updated;
      }
      updated['appStatus'] = action.status;
      return updated;
    
    default:
      return state;
  }

}