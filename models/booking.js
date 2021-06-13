var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    UserID:         String,
    flightid:       String,
    flightBid:      String,
    ticket:         Number,
    point:          Number
});

module.exports = mongoose.model('booking', bookSchema);