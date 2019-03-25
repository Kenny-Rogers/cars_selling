//setting up a router for /seller route
const express = require('express');
const route = express.Router();
const CarModel = require('../models/Car');
const expressUpload = require('express-fileupload');
const func = require('../core/functions');

route.use(expressUpload());

route.get('/cars', (req, res)=>{});

route.post('/car/add',(req, res)=>{
    //async function to save upload files
    func.saveFile(req).then((uploadFiles)=>{
        let newCar = new CarModel();
        newCar.seller_id = req.session.user_id;
        newCar.hottest.status = req.body.hottest;
        newCar.details.manufacturer = req.body.manufacturer;
        newCar.details.price = req.body.price,
        newCar.details.model = req.body.model;
        newCar.details.cubic_capacity = req.body.cubic_capacity;
        newCar.details.registration_status = req.body.registration_status;
        newCar.details.mileage = req.body.mileage;
        newCar.details.additional_info = req.body.additional_info;  
        newCar.details.pictures = uploadFiles;
        newCar.save((error, car) => {
            if (error) {
                console.log('Failed to add car ', error);
                //TODO:: Render failed to save car page
                res.send('Failed to add car');
            } else {
                console.log('Car details saved successfully', car);
                //TODO:: Render saved car details successfully page
                res.send('Car details saved successfully');
            }
        });
    }).catch((error)=>{
        console.log(error);
        //TODO:: Render failed to save car page
    });
    
});

route.get('/car/remove/:car_id', (req,res)=>{
    CarModel.findByIdAndRemove(req.params.car_id, (error, car)=>{
        if(error){
            console.log(`Failed to remove car ${error}`);
            //TODO:: render html page
            res.send('failed to remove car');
        } else {
            console.log(`Successfully remove car ${car._id}`);
            //TODO:: render success html
            res.send(`Car ${car._id} removed successfully`);
        }
    });
});

route.post('/car/edit/:car_id', (req, res)=>{

});

module.exports = route;