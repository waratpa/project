var mongoose = require('mongoose');
var Flight   = require('./models/flight');

function seedDB(){
Flight.remove({}, function(err){
    if(err) {
        console.log(err);
    }
    console.log("Remove DB completed");
})    

var flightSchema = [
    {
    flightname : "AAAAA01",
    from : "FA1",
    to : "TB1",
    date : "2000-01-01",
    time : "10.00",
    classF : "B",
    stop: "1",
    sit : "10",
    price : "1000"
    },
    {
        flightname : "AAA02",
        from : "FA2",
        to : "TB2",
        date : "2011-01-01",
        time : "20.00",
        classF : "B",
        stop: "2",
        sit : "20",
        price : "1000"
    }
];

flightSchema.forEach(function(flight){
Flight.create(flight, function(err, Flights){
    if(err) {
        console.log(err);
    } else {
        console.log('New data added');
    }
});
});
}

module.exports = seedDB;