let mongoose = require('mongoose');
require('mongoose-type-email');
let Schema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    status : {
        type: String
    }
}, {collection: 'users'});

let Users = module.exports = mongoose.model('Users', Schema);
