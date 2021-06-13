var mongoose = require('mongoose');

var townSchema = new mongoose.Schema({
    townname:     String
});

module.exports = mongoose.model('town', townSchema);