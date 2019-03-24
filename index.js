//including modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const seller_router = require('./routes/seller');
const buyer_router = require('./routes/buyer');
const admin_router = require('./routes/admin');
const userModel = require('./models/User'); 

//express app setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://car_selling_webapp:IfnPjZQiM367ABPc@cluster0-avv4c.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
const db = mongoose.connection;


app.post('/signin', (req, res)=>{
    userModel.findOne(
        {email:req.body.email, password:req.body.password},
        (error, user)=>{
            if (error || user == null) {
                console.error(error);
                res.send('Invalid email or password');
            } else {
                let id = user._id;
                console.log(`Succesfully found user ${id}`, user);
                res.send(user);
            }
        });
});

app.post('/signup', (req, res)=>{
    //creating new user instance
    let newUser = new userModel();
    newUser.full_name = req.body.full_name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.digital_address = req.body.digital_address;
    newUser.voter_id = req.body.voter_id;
    newUser.type = req.body.type;
    
    //saving to db
    newUser.save((error, document) =>{
        if(error){
            console.log('Failed to save user', error);
            res.status(400);
        } else {
            console.log('Save user successfully', document);
            res.status(200);
            res.send(document);
        }
    });
});

//setting up routers to handle respective route requests
app.use('/seller', seller_router);
app.use('/buyer', buyer_router);
app.use('/admin',  admin_router);


//setting up db connection and server listening port
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log('database connection opened');
    app.listen(1500, () => {
        console.log('App listening on port 1500');
    });
});
