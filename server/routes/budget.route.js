const express = require('express');
const redisClient = require('../redis/redis');
const router = express.Router();

router.route('/').post((req, res) => {
  redisClient.setnx('budget', 0, function() {});
});

module.exports = router;
