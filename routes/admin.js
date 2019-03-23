//setting up a router for /seller route
const express = require('express');
const route = express.Router();

route.get('/list', (req, res) => { });

//hottest car routes
route.get('/hottestcars' , (req,res) => {});
route.post('/hottestcars/add', (req, res) => { });
route.get('/hottestcars/remove/:car_id', (req, res) => { });

//user management routes
route.get('/allusers', (req, res) => { }); 
route.post('/user/block', (req, res) => { });

module.exports = route;