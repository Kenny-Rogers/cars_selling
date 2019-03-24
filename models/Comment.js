const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user_id : String,
    date : Date.now,
    message : String,
    additional_info : {
        file : String
    }
});

module.exports = new mongoose.model('COmment', CommentSchema);