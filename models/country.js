var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
    countryname:     String,
});

module.exports = mongoose.model('country', countrySchema);