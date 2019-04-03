const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    seller_id: { type: Schema.Types.ObjectId, ref: 'user' },
    date_uploaded : {type :Date, default:Date.now},
    hottest : {
        date_approved : {type:Date, default:null},
        status : {type:Boolean, default:false}
    },
   sale : {
        buyer_id: { type: Schema.Types.ObjectId, ref: 'user' },
        date_purchased : Date
   },
   details : {
        price : Number,
        manufacturer : String,
        model : String,
        cubic_capacity : String,
        registration_status : { type:Boolean, default:false},
        mileage : Number,
        additional_info : String,
        pictures : [String],
        cylinders : String
   }
});

module.exports = new mongoose.model('Car', CarSchema); 