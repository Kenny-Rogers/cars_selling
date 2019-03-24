const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    seller_id : String,
    hottest : {
        date_applied : Date.now,
        date_approved : {type:Date, default:null},
        status : {type:Boolean, default:false}
    },
   sale : {
        buyer_id : String,
        date_purchased : Date
   },
   details : {
        manufacturer : String,
        model : String,
        cubic_capacity : String,
        registration_status : { type:Boolean, default:false},
        mileage : Number,
        additional_info : String
   }
});

module.exports = new mongoose.model('Car', CarSchema); 