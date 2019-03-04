const express = require('express');
const redis = require('redis');

const app = express();

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

app.get('/', (req, res) => {
  redisClient.hgetall('expenses', (error, values) => {
    res.send(values);
  });
});

app.post('/', (req, res) => {
  redisClient.incr('index', index => {
    console.log(index);
    console.log(typeof index);
    const jsonBody = JSON.stringify({
      message: req.body.message,
      value: req.body.value
    });
    redisClient.hset('expenses', String(index), jsonBody, number => {
      res.send(number);
    });
  });
});

app.listen(5000);
