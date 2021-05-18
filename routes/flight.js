const   express         = require('express'),
        router          = express.Router(),
        passport        = require('passport'),
        Flight          = require('./models/flight');

app.get('/info/:id' , function(req,res){
    Flight.findById(req.params.id , function(err, foundflight){
        if(err){
            console.log(err);
        } else {
            res.render("info.ejs", {flight: foundflight});
        }
    });
});
