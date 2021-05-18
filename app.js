const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        User            = require('./models/user'),
        Flight          = require('./models/flight'),
        seedDB          =  require('./seeds');

mongoose.connect('mongodb://localhost/newdata')

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
seedDB();

app.use(require('express-session')({
    secret: 'secret is always secret.',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
    { usernameField: 'email',
    },
    User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.get('/', function(req, res){
    Flight.find({}, function(err, allflight){
        if(err){
            console.log(err);
        } else {
            res.render('home.ejs', {flights: allflight});
        }
    });
});

app.get('/adminhome', function(req, res){
    Flight.find({}, function(err, allflight){
        if(err){
            console.log(err);
        } else {
            res.render('admin/home.ejs', {flights: allflight});
        }
    });
});

app.get('/add' , function(req,res){
    res.render('admin/add.ejs');
});

app.get('/login' , function(req,res){
    res.render('login.ejs');
});

app.get('/acount' , isLoggedIn, function(req,res){
    res.render('acount.ejs');
});

app.get('/register' , function(req,res){
    res.render('register.ejs');
});

app.get('/info/:id' , function(req,res){
    Flight.findById(req.params.id , function(err, foundflight){
        if(err){
            console.log(err);
        } else {
            res.render("info.ejs", {flight: foundflight});
        }
    });
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

app.get('/admin' , function(req,res){
    res.render('admin/login.ejs');
});

app.post('/login', passport.authenticate('local',   
    {   
        successRedirect: '/',
        failureRedirect: '/login'
    }), function(res, res){       
});

app.post('/admin', passport.authenticate('local',   
    {   
        successRedirect: '/',
        failureRedirect: '/admin'
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

function isLoggedIn2(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('admin/home.ejs');
}
app.listen( 3000, function(req,res){
    console.log("The server has been connect by port : ");
});