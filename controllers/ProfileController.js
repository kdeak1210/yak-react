const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');

module.exports = {

  find: function(params, callback){
    Profile.find(params, (err, profiles) => {
      if (err){
        callback(err, null);
        return;
      }
      callback(null, profiles);
    });
  },

  findById: function(id, callback){
    Profile.findById(id, (err, profile) => {
      if (err){
        callback(err, null);
        return;
      }
      callback(null, profile);
    });
  },

  create: function(params, callback){
    
    // HASH THE PASSWORD right before sending params to MONGO create
    params['password'] = bcrypt.hashSync(params.password, 10);
    Profile.create(params, (err, profile) => {
      if(err){
        callback(err, null);
        return;
      }
      callback(null, profile);
    });
  },

  update: function(id, params, callback){
    Profile.findByIdAndUpdate(id, params, {new:true}, (err, profile) => {
      if(err){
        callback(err, null);
        return;
      }
      callback(null, profile);
    });
  },

  destroy: function(id, callback){
    Profile.findByIdAndRemove(id, (err) => {
      if(err){
        callback(err, null);
        return;
      }
      callback(null, null);
    });
  } 

}