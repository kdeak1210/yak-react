import constants from '../constants/constants';

export default {

  /** Action triggered when zones come back from API */
  zonesReceived: (zones) => {
    return {
      type: constants.ZONES_RECEIVED, // type required for redux
      zones: zones                    // payload
    }
  },

  /** Action triggered when zone is posted ('zones' = payload from API) */
  zoneCreated: (zone) => {
    return {
      type: constants.ZONE_CREATED,
      zone: zone
    }
  },

  /** Action triggered when zone is selected, takes index of clicked zone */
  selectZone: (index) => {
    return {
      type: constants.SELECT_ZONE,
      selectedZone: index
    }
  }

}