const express = require('express');
const redisClient = require('../redis/redis');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    redisClient.hgetall('expenses', (error, values) => {
      res.json({
        error: false,
        message: 'Successfully retrieve',
        payload: {
          count: Object.keys(values).length,
          expenses: values
        }
      });
    });
  })
  .post((req, res) => {
    redisClient.setnx('index', 0, function() {
      redisClient.incr('index', function(error, reply) {
        const jsonBody = JSON.stringify({
          message: req.body.message,
          value: req.body.value
        });
        redisClient.hset('expenses', String(reply), jsonBody, () => {
          res.json({
            error: false,
            message: 'Successfully inserted'
          });
        });
      });
    });
  });

router.route('/:index').delete((req, res) => {
  redisClient.hdel('expenses', req.params.index, () => {
    res.json({
      error: false,
      message: `Successfully deleted item ${req.params.index}`
    });
  });
});

module.exports = router;
