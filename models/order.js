const mongoose = require('mongoose');
const schema = mongoose.Schema;

const OrderSchema = new Schema({
    car_id  : String,
    buyer_id : String,
    date_ordered : { type:Date, default:Date.Now},
    status : {type:String, default:'ordered'}
});

module.exports = db.mongoose.model('Order',OrderSchema);