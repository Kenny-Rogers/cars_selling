const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name : String,
    last_name: String,
    username: String,
    email : String,
    password : String,
    phonenumber : String,
    digital_address : String,
    voter_id : String,
    type : { type: String },
    usage : {
        date_created : { type : Date, default : Date.now },
        status : { type : String, default : 'enabled'}
    }
});

module.exports = mongoose.model('User', UserSchema);

