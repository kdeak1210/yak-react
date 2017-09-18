const express = require('express');
const router = express.Router();

// Grabs controllers/index.js because index is the default if not specified
const controllers = require('../controllers');

router.get('/:resource', (req, res, next) => {
  
  const resource = req.params.resource;
  
  if (resource == 'zone'){
    ZoneController.find(req.query, (err, results) => {
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
      })
    });
  }
});

router.get('/:resource/:id', (req, res, next) => {

  const resource = req.params.resource;
  const id = req.params.id;

  if (resource == 'zone' && id != ''){
    ZoneController.findById(id, (err, result) => {
      if (err){
        res.json({
          confirmation: 'fail',
          message: `Zone id '${id}' not found`
        });
        return;
      }
      res.json({
        confirmation: 'success',
        result: result
      })
    });
  }
});

router.post('/:resource', (req, res, next) => {

  const resource = req.params.resource;

  if (resource == 'zone') {
    ZoneController.create(req.body, (err, result) => {
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
      })
    });
  }
});

module.exports = router;