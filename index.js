//including modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db =  require('./core/db');
const seller_router = require('./routes/seller');
const buyer_router = require('./routes/buyer');
const admin_router = require('./routes/admin');

//express app setup
const app = express();
app.use(bodyParser.json());

//setting up routers to handle respective route requests
app.use('/seller', seller_router);
app.use('/buyer', buyer_router);
app.use('/admin',  admin_router);

db.connect((error)=>{
    if(error)
        console.log('Unable to connect to Database', error);
    else{
        console.log('Database connection successful');
        app.listen(1500, ()=>{ console.log('App listening on port 1500'); });
    }
})

