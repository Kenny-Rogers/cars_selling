//this file is for db operations
//MongoDB connection variables
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const assert = require('assert');
const db_name   = 'cars_selling';
const url = 'mongodb+srv://car_selling_webapp:IfnPjZQiM367ABPc@cluster0-avv4c.mongodb.net/test?retryWrites=true';
const mongoOptions = {useNewUrlParser:true};
const client = new MongoClient(url, mongoOptions);
const state = { db:null };

//db connection
const connect_db = () => {
        client.connect((error)=>{
        assert.equal(null,error);
        console.log('db connection successfull');
        state.db =  client.db(db_name);
        client.close();
    });
}

//get db copy
const get_db = () => { return state.db; }

//get primary key
const get_primary_key = () => { return objectId(_id); }

module.exports =  {get_db, connect_db, get_primary_key} ;
