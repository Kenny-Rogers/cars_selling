//setting up a router for /seller route
const express = require('express');
const route = express.Router();

route.get('/cars', (req, res)=>{});

route.post('/car/add',(req, res)=>{});

route.post('/car/remove/:car_id', (req,res)=>{});

route.post('/car/edit/:car_id', (req, res)=>{});

module.exports = route;