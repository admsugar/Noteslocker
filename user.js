/**
 * user.js
 * Created by Adam on 2/13/2016.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String
});

module.exports = mongoose.model('User', UserSchema);