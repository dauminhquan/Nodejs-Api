let mongoose = require('mongoose');
require('mongoose-type-email');
let Schema = new mongoose.Schema({
    key: {
     type: String,
     unique: true
    },
    expired_date : Date,
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }

}, {collection: 'tokens'});

let Token = module.exports = mongoose.model('Token', Schema);
