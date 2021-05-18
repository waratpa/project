const   express         = require('express'),
        router          = express.Router(),
        passport        = require('passport'),
        User            = require('./models/user'),
        Flight          = require('./models/flight');


router.get('/', function(req, res){
    Flight.find({}, function(err, allflight){
        if(err){
            console.log(err);
        } else {
            res.render('home.ejs', {flights: allflight});
        }
    });
});

router.get('/acount' , isLoggedIn, function(req,res){
    res.render('acount.ejs');
});

router.get('/register' , function(req,res){
    res.render('register.ejs');
});

app.post('/register', function(req, res){
    var username = req.body.email;
    var email = req.body.email;
    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    var numphone = req.body.numphone;
    var password = req.body.password;

    var newUser = new User({username:username, FirstName:Fname, LastName:Lname, PhoneNumber:numphone,email:email,point:"0",gender: "-",Age: "-"});

User.register(newUser, password, function(err, user){
    if(err) {
        console.log(err);
        return res.render('register');
    }
    passport.authenticate('local')(req, res, function(){
            res.redirect('/');
        });
    });
});

router.get('/login' , function(req,res){
    res.render('login.ejs');
});

app.post('/login', passport.authenticate('local',   
    {   
        successRedirect: '/',
        failureRedirect: '/register'
    }), function(res, res){       
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;