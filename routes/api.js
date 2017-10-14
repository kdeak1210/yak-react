const express = require('express');
const router = express.Router();

// Grabs controllers/index.js because index is the default if not specified
const controllers = require('../controllers');

router.get('/:resource', (req, res, next) => {
  
  const resource = req.params.resource;  
  const controller = controllers[resource];

  // The requested resource does not exist
  if (controller == null){
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
    return;
  }

  controller.find(req.query, (err, results) => {
    if (err){
      res.json({
        confirmation: 'fail',
        message: err
      });
      return;
    }
    res.json({
      confirmation: 'success',
      results: results
    });
  });
});

router.get('/:resource/:id', (req, res, next) => {

  const resource = req.params.resource;
  const id = req.params.id;
  const controller = controllers[resource];
  
  // The requested resource does not exist
  if (controller == null){
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
    return;
  }

  controller.findById(id, (err, result) => {
    if (err){
      res.json({
        confirmation: 'fail',
        message: `${resource} id '${id}' not found`
      });
      return;
    }
    res.json({
      confirmation: 'success',
      result: result
    });
  });
});

router.post('/:resource', (req, res, next) => {

  const resource = req.params.resource;
  const controller = controllers[resource];
  
  // The requested resource does not exist
  if (controller == null){
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
    return;
  }

  controller.create(req.body, (err, result) => {
    if (err){
      res.json({
        confirmation: 'fail',
        message: 'Failed to post to Mongo'
      });
      return;
    }
    res.json({
      confirmation: 'success',
      result: result
    });
  });
});

router.put('/:resource/:id', (req, res, next) => {

  const resource = req.params.resource;
  const controller = controllers[resource];

  if (controller == null){
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
    return;
  }

  const id = req.params.id;

  controller.update(id, req.body, (err, result) => {
    if (err){
      res.json({
        confirmation: 'fail',
        message: err
      });
      return;
    }

    res.json({
      confirmation: 'success',
      result: result
    });
  });
});

module.exports = router;