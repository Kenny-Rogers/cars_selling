//this file is for db operations
//MongoDB connection variables
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const db_name   = 'cars_selling';
const url = 'mongodb+srv://car_selling_webapp:IfnPjZQiM367ABPc@cluster0-avv4c.mongodb.net/test?retryWrites=true';
const mongoOptions = {useNewUrlParser:true};
const client = new MongoClient(url, mongoOptions);
const state = { db:null };

//db connection
const connect = (cb) => {
    if(state.db)
        cb();
    else {
        client.connect((error)=>{ 
            if(error) 
                cb(error);
            else {
                state.db =  client.db(db_name);
                cb();
            }
        });
    }
}

//get db copy
const get_db = () => { return state.db; }

//get primary key
const get_primary_key = () => { return objectId(_id); }

module.exports =  {get_db, connect, get_primary_key} ;
