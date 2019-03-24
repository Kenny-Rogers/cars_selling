const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    full_name : String,
    email : String,
    password : String,
    digital_address : String,
    voter_id : String,
    type : { type: String },
    usage : {
        date_created : { type : Date, default : Date.now },
        last_login : Date,
        status : { type : String, default : 'enabled'}
    }
});

module.exports = mongoose.model('User', UserSchema);

