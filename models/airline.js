var mongoose = require('mongoose');

var airlineSchema = new mongoose.Schema({
    airlinename:    String,
    image:          String
});

module.exports = mongoose.model('airline', airlineSchema);