var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username:       String,
    email:          String,
    password:       String,
    FirstName:      String,
    LastName:       String,
    PhoneNumber:    String,
    gender:         String,
    Age:            String,
    point:          Number,
    userclass:      String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);