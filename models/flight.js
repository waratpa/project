var mongoose = require('mongoose');

var flightSchema = new mongoose.Schema({
    airlinename:     String,
    from:           String,
    to:             String,
    date:           String,
    time:           Number,
    departure:      String,   
    classF:         String,
    stop:           Number,
    price:          Number,
    seat:           Number,
    img:            String
});

module.exports = mongoose.model('flight', flightSchema);