//setting up a router for /seller route
const express = require('express');
const route = express.Router();
const CarModel = require('../models/Car');
const expressUpload = require('express-fileupload');
const func = require('../core/functions');

route.use(expressUpload());

//get all cars belonging to this currently logged in seller
route.get('/cars', (req, res)=>{
    CarModel.find({seller_id : req.session.user_id}, (error, cars)=>{
        if(error)
            console.log(`failed to get seller cars ${error}`);
            //TODO:: html page without any car
        else {
            console.log('fetching cars for user');
            //TODO:: html page with all cars belonging to user
            res.json(cars);
        }
    });
});

//add new car 
route.post('/car/add',(req, res)=>{
    //async function to save upload files
    func.saveFile(req).then((uploadFiles)=>{
        let newCar = new CarModel();
        newCar.seller_id = req.session.user_id;
        newCar.hottest.status = req.body.hottest;
        newCar.details.manufacturer = req.body.manufacturer;
        newCar.details.price = req.body.price;
        newCar.details.model = req.body.model;
        newCar.details.cubic_capacity = req.body.cubic_capacity;
        newCar.details.registration_status = req.body.registration_status;
        newCar.details.mileage = req.body.mileage;
        newCar.details.additional_info = req.body.additional_info;  
        newCar.details.pictures = uploadFiles.length;
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

//delete car
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

//get page to modify car information
route.get('/car/edit/:car_id', (req, res)=>{
    CarModel.findById(req.params.car_id, (error,car)=>{
        if (error) {
            console.log(`Car not found to edit ${error}`);
            //TODO:: render html page 
            res.send('Car not found to edit');
        } else {
            console.log(`Car successfully found to edit ${car}`);
            //TODO:: render success html with car details to edit
            res.json(car);
        }
    });
});

//modify car information
route.post('/car/edit/:car_id', (req,res)=>{
    //async function to save upload files
    func.saveFile(req).then((uploadFiles) => {
        //update from form
        let update = {
            'hottest.status': req.body.hottest,
            'details.manufacturer': req.body.manufacturer,
            'details.price': req.body.price,
            'details.model': req.body.model,
            'details.cubic_capacity': req.body.cubic_capacity,
            'details.registration_status': req.body.registration_status,
            'details.mileage': req.body.mileage,
            'details.additional_info': req.body.additional_info,
        }

        //update = uploadFiles != [] ? (update['details.pictures'] = uploadFiles) : update;
        
        CarModel.findByIdAndUpdate(req.params.car_id, { $set: update
        }, {new:true},(error, car) =>  {
            if (error) {
                console.log('Failed to update car ', error);
                //TODO:: Render failed to save car page
                res.send('Failed to update car');
            } else {
                console.log('Car details updated successfully', car);
                //TODO:: Render saved car details successfully page
                res.send('Car details updated successfully');
            }
        });
    }).catch((error) => {
        console.log(error);
        //TODO:: Render failed to save car page
    });
});

module.exports = route;