//including modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator= require('express-validator');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session'); 
const path = require('path');
const mongoStore = require('connect-mongo')(expressSession);

//including the routers for various pages
const seller_router = require('./routes/seller');
const buyer_router = require('./routes/buyer');
const admin_router = require('./routes/admin');
const db_conn = require('./core/cred');

//including user model
const userModel = require('./models/User'); 
const carModel = require('./models/Car');

//variable definitions 
const production = 'https://autobought.herokuapp.com/';
const port = process.env.PORT || 1500;
const development = `http://localhost:${port}/`;
const base_url = (process.env.NODE_ENV ? production : development);

//db connection
mongoose.connect(db_conn.db, { useNewUrlParser: true });
const db = mongoose.connection;

//express app setup
const app = express();
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'asset')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(expressSession({ 
    secret:'qpldhn273_s!', 
    saveUninitialized:false, 
    resave:false,
    store : new mongoStore({ mongooseConnection : db }),
    cookie : { maxAge : 20 * 60 * 1000 }
}));
app.use((req, res, next)=>{
    res.locals.session = req.session;
    next();
});
app.use(flash());
app.set('view engine', 'ejs');


//universal routes
app.get('/signin', (req,res)=>{
    res.sendFile(path.join(__dirname, 'asset', 'login.html'));
});


app.post('/signin', (req, res)=>{
    userModel.findOne(
        {email:req.body.email, password:req.body.password},
        (error, user)=>{
            if (error || user == null) {
                console.error(error);
                //res.send('Invalid email or password');
                req.flash('info', 'invalid username or password');
                res.redirect(`${base_url}signin`);
            } else {
                console.log(`Succesfully found user ${user}`);
                req.session.user_id = user._id;
                req.session.user_type = user.type;
                req.session.username = user.username.toUpperCase();
                let userbase = (user.type == 'buyer') ? 'orders' :
                               (user.type == 'seller') ? 'cars' :
                               (user.type == 'admin')  ? 'admin' : '/signin';
                
                //if loggin successful redirect to user type landing page
                //res.redirect(`${base_url}${userbase}`);
                res.redirect(`${base_url}`);
                // res.send('login successfull');
            }
        });
});

app.get('/', (req,res)=>{
    res.render('index', {});
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'asset', 'signup.html'));
});

app.post('/signup', (req, res)=>{
    //creating new user instance
    let newUser = new userModel();
    newUser.first_name = req.body.first_name;
    newUser.last_name = req.body.last_name;
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.digital_address = req.body.digital_address;
    newUser.voter_id = req.body.voter_id;
    newUser.type = req.body.type;
    newUser.phonenumber = req.body.phonenumber;

    
    //saving to db
    newUser.save((error, document) =>{
        if(error){
            console.log('Failed to save user', error);
            res.redirect(`${base_url}signup`);
        } else {
            console.log('Save user successfully', document);
            //TODO:: successful signup, redirect to signin page
           // res.redirect(`${base_url}signin`);
            res.redirect(`${base_url}signin`);
        }
    });
});

app.get('/signout', (req, res)=>{
    req.session.destroy(()=>{
        console.log('User logged out successfully');
        //TODO:: render sign out successfully page
        res.redirect(`${base_url}`);
    });
});

app.get('/hotcars', (req,res)=>{
    carModel.find(
        { "hottest.status": true})
        .exec((error, cars)=>{
            if (error || cars.lenght == 0) { 
                console.log('No cars found');
            } else {
                console.log('Hot Cars found');
                console.log(cars);
            }
            res.render('hotcars', {cars:cars});
        }
    );
});

app.get('/othercars', (req, res) => {
    res.render('othercars', {});
});

app.get('/sell', (req, res) => {
    res.render('sell', {});
});

app.get('/buy', (req, res) => {
    res.render('buy', {});
});

app.get('/about', (req, res) => {
    res.render('about', {});
});

app.get('/privacy', (req, res) => {
    res.render('privacy', {});
});

app.get('/termsandconditions', (req, res) => {
    res.render('termsandconditions', {});
});

app.get('/return_policy', (req, res) => {
    res.render('return_policy', {});
});

//setting up routers to handle respective route requests
app.use('/seller', seller_router);
app.use('/buyer', buyer_router);
app.use('/admin',  admin_router);


//setting up db connection and server listening port
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log('database connection opened');
    app.listen(port, () => {
        console.log('App listening on port 1500');
    });
});
