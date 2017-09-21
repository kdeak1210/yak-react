const Zone = require('../models/Zone');

/** Exporting some CRUD operations...
 * Note: Mongoose convention, put error first then payload ex. (err, zones)
 * ** The backend should be pure functions, the React frontend can format the data
 */
module.exports = {

  find: function(params, callback){
    Zone.find(params, (err, zones) => {
      if (err){
        callback(err, null);
        return;
      }
      callback(null, zones);
    });
  },

  findById: function(id, callback){
    Zone.findById(id, (err, zone) => {
      if (err){
        callback(err, null);
        return;
      }
      callback(null, zone);
    });
  },

  create: function(params, callback){
    // // Zipcodes is passed as string -> need to convert to [] as per Schema
    // let zips = params['zipCodes'];
    // let zipArray = zips.split(',');

    // // Map through the array, removing any trailing/leading whitespace
    // zipArray = zipArray.map(zip => zip.trim());
    // params['zipCodes'] = zipArray;

    Zone.create(params, (err, zone) => {
      if (err){
        callback(err, null);
        return;
      }
      callback(null, zone);
    });
  },

  update: function(id, params, callback){
    Zone.findByIdAndUpdate(id, params, {new:true}, (err, zone) => {
      if (err){
        callback(err, null);
        return;
      }
      callback(null, zone);
    });
  },

  destroy: function(id, callback){
    Zone.findByIdAndRemove(id, (err) => {
      if (err){
        callback(err, null);
        return;
      }
      callback(null, null);
    });
  }

}