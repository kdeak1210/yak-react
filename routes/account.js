const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');
const bcrypt = require('bcrypt');

/** This route is for signing up, logging in, logging out etc
 * Therefore, they will be named 'actions'; things the user is doing
 */

router.post('/:action', (req, res, next) => {
  
  const action = req.params.action;

  if (action == 'register'){
    ProfileController.create(req.body, (err, result) => {
      if (err){
        res.json({
          confirmation: 'fail',
          message: err.message
        });
        return;
      }

      req.session.user = result._id
      res.json({
        confirmation: 'success',
        user: result
      });
    })
  }
  
  if (action == 'login'){
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

      /** Access SESSION in the request (by virtue of client-sessions config) */
      req.session.user = profile._id;

      // The username exists and password matched, send back entire profile
      res.json({
        confirmation: 'success',
        user: profile
      });
    });
  }
});

router.get('/:action', (req, res, next) => {
  
  const action = req.params.action;

  // If the aciton is logout, clear the session!
  if (action == 'logout'){
    req.session.reset();
    res.json({
      confirmation: 'success',
      message: 'logged out'
    });
  }
  
  if (action == 'currentuser'){

    // This is a new user, never signed up or logged in
    if (req.session == null){
      res.json({
        confirmation: 'fail',
        message: 'User not logged in'
      });
      return;
    }

    // Slightly more nuanced, they have a session but no user attached to it
    if (req.session.user == null){
      res.json({
        confirmation: 'fail',
        message: 'User not logged in'
      });
      return;
    }

    // Check the current user, if theyre logged in send entire information
    ProfileController.findById(req.session.user, (err, result) => {
      if (err){
        res.json({
          confirmation: 'fail',
          message: err
        });
        return;
      }
      res.json({
        confirmation: 'success',
        user: result
      });
    });
    
  }
});

module.exports = router;