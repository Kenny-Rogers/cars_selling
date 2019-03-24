const db = require('../core/db');

const OrderSchema = new db.Schema({
    
});

module.exports = db.mongoose.model('Order',OrderSchema);