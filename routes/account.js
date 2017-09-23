const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');
const bcrypt = require('bcrypt');

/** This route is for signing up, logging in, logging out etc
 * Therefore, they will be named 'actions'; things the user is doing
 */

router.post('/:action', (req, res, next) => {
  
  const action = req.params.action;
  
  if(action == 'login'){
    const params = {username: req.body.username};
    ProfileController.find(params, (err, results) => {
      if (err){
        console.log('ERR: ' + err);
        res.json({
          confirmation: 'fail',
          message: err.message
        });
        return;
      }

      if (results.length == 0){
        res.json({
          confirmation: 'fail',
          message: 'Username does not exist.'
        });
        return;
      }

      // SHOULD guarantee its unique username, but for now grab first one
      const profile = results[0];
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password);
      if (isPasswordCorrect == false){
        res.json({
          confirmation: 'fail',
          message: 'Wrong password.'
        });
        return;
      }

      // The username exists and password matched, send back entire profile
      res.json({
        confirmation: 'success',
        profile: profile
      });
    });
  }
});

router.get('/:action', (req, res, next) => {
  
  const action = req.params.action;
  
  if(action == 'login'){
    res.json({
      confirmation: 'success',
      action: action
    });
  }
});

module.exports = router;