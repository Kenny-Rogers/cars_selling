//setting up a router for /seller route
const express = require('express');
const route = express.Router();

route.get('/orders', (req, res) => { });

route.post('/order/make', (req, res) => { });

route.post('/order/cancel', (req, res) => { });

route.post('/order/edit', (req, res) => { });

module.exports = route;