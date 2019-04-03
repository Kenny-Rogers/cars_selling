//setting up a router for /seller route
const express = require('express');
const route = express.Router();
const OrderModel = require('../models/Order');

route.get('/orders', (req, res) => {
    OrderModel.find({ buyer_id: req.session.user_id }, (error, orders) => {
        if (error)
            console.log(`failed to get buyer's orders ${error}`);
        //TODO:: html page without any car
        else {
            console.log('fetching orders for user');
            //TODO:: html page with all cars belonging to user
            res.json(orders);
        }
    });
 });

route.post('/order/make', (req, res) => {
    let newOrder = new OrderModel();
    newOrder.car_id = req.body.car_id;
    newOrder.buyer_id = req.session.user_id;
    // newOrder.date_ordered = Date.now;

    newOrder.save((error, order)=>{
        if(error)
            console.log(`unable to make new order ${error}`);
            //TODO:: html to display failed to make order page
        else {
            console.log(`placed order successfully \n ${order}`);
            //TODO:: html to display order made successfully
            res.json(order);
        }
    });
 });

route.get('/order/cancel/:order_id', (req, res) => { 
    OrderModel.findByIdAndUpdate(req.params.order_id, 
        {$set:{'status':'cancelled'}}, 
        {new:true},(error,order)=>{
            if (error) {
                console.log('Failed to cancel order', error);
                //TODO:: Render failed to save car page
                res.send('Failed to cancel order');
            } else {
                console.log('Order Cancelled successfully', order);
                //TODO:: Render saved car details successfully page
                res.send('Order Cancelled successfully');
            }
    });
});

//route.post('/order/edit', (req, res) => { });

module.exports = route;