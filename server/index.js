const express = require('express');
const redis = require('redis');

const app = express();
app.use(express.json())

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

app.get('/expense', (req, res) => {
  redisClient.hgetall('expenses', (error, values) => {
    res.json({
      error: false,
      message: 'Successfully retrieve',
      payload: {
        count: Object.keys(values).length,
        expenses: values
      }
    })
  });
});

app.post('/expense', (req, res) => {
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
        })
      });
    })
  })
});

app.delete('/expense', (req, res) => {
  redisClient.del('index', () => {
    redisClient.del('expenses', () => {
      res.json({
        error: false,
        message: 'Successfully deleted'
      })
    })
  })
})

app.listen(5000);
