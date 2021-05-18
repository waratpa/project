var mongoose = require('mongoose');

var flightSchema = new mongoose.Schema({
    flightname:     String,
    from:           String,
    to:             String,
    date:           String,
    time:           String,
    classF:         String,
    stop:           Number,
    price:          Number,
    sit:            Number
});

module.exports = mongoose.model('flight', flightSchema);