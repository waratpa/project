const town = require('./models/town');
const user = require('./models/user');

const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        methodOverride  = require('method-override'),
        multer          = require('multer'),
        path            = require('path'), 
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        User            = require('./models/user'),
        Flight          = require('./models/flight'),
        Town            = require('./models/town'),
        Country         = require('./models/country'),
        Book            = require('./models/booking'),
        Airline         = require('./models/airline'),
        seedDB          =  require('./seeds'),
        searchcheck     = false;
        storage = multer.diskStorage({
            destination: function(req, file, callback){
                callback(null,'public/uploads/');
            },
            filename: function(req, file, callback){
                callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        }),
        imageFilter = function (req, file, callback){
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
                return callback(new Error('Only JPG, jpeg, PNGm and GIF image files are allowed!'), false);
            }
            callback(null, true);
        },
        upload  = multer({storage: storage, fileFilter: imageFilter});        

mongoose.connect('mongodb://localhost/newdata')

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
// seedDB();

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
            Airline.find({}, function(err, allairline){
                if(err){
                    console.log(err);
                } else {
                    Town.find({}, function(err, alltown){
                        if(err){
                            console.log(err);
                        } else {
                            Country.find({}, function(err, allcountry){
                                if(err){
                                    console.log(err);
                                } else {
                                    Flight.find({}, function(err, allflightsorttime){
                                        if(err){
                                            console.log(err);
                                        } else {
                                            Flight.find({}, function(err, allflightsortprice){
                                                if(err){
                                                    console.log(err);
                                                } else {

                                                    Flight.distinct('from', function(err, ofrom){
                                                        if(err){
                                                            console.log(err);
                                                        } else {
                                                            Flight.distinct('to', function(err, oto){
                                                                if(err){
                                                                    console.log(err);
                                                                } else {
                                                                    Flight.distinct('classF', function(err, oclass){
                                                                        if(err){
                                                                            console.log(err);
                                                                        } else {
                                                                            Flight.distinct('stop', function(err, ostop){
                                                                                if(err){
                                                                                    console.log(err);
                                                                                } else {
                                                                                    Flight.distinct('date', function(err, odate){
                                                                                        if(err){
                                                                                            console.log(err);
                                                                                        } else {

                                                                                            res.render('home.ejs', {odate:odate,oto:oto, ostop,ostop, oclass:oclass, ofrom:ofrom,flightp: allflightsortprice,flightt: allflightsorttime,flights: allflight, airlines: allairline, towns: alltown, countrys: allcountry});
                                                                                        
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });

                                                }
                                            }).sort({"price":1});
                                        }
                                    }).sort({"time":1});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

app.post('/homeS', function(req, res){
    var from = req.body.Sfrom;
    var to = req.body.Sto;
    var sclass = req.body.Sclass;
    var dated = req.body.Sdated;
    var dateb = req.body.dateb;
    var num = req.body.Snum;
    Flight.find({}, function(err, allflight){
        if(err){
            console.log(err);
        } else {
            Airline.find({}, function(err, allairline){
                if(err){
                    console.log(err);
                } else {
                    Town.find({}, function(err, alltown){
                        if(err){
                            console.log(err);
                        } else {
                            Country.find({}, function(err, allcountry){
                                if(err){
                                    console.log(err);
                                } else {
                                    Flight.find({from:from,to:to,classF:sclass,date:dated}, function(err, flightn){
                                        if(err){
                                            console.log(err);
                                        } else {
                                            Flight.find({from:from,to:to,classF:sclass,date:dated}, function(err, allflightsorttime){
                                                if(err){
                                                    console.log(err);
                                                } else {
                                                    Flight.find({from:from,to:to,classF:sclass,date:dated}, function(err, allflightsortprice){
                                                        if(err){
                                                            console.log(err);
                                                        } else {
                                                            Flight.distinct('from', function(err, ofrom){
                                                                if(err){
                                                                    console.log(err);
                                                                } else {
                                                                    Flight.distinct('to', function(err, oto){
                                                                        if(err){
                                                                            console.log(err);
                                                                        } else {
                                                                            Flight.distinct('classF', function(err, oclass){
                                                                                if(err){
                                                                                    console.log(err);
                                                                                } else {
                                                                                    Flight.distinct('stop', function(err, ostop){
                                                                                        if(err){
                                                                                            console.log(err);
                                                                                        } else {
                                                                                            Flight.distinct('date', function(err, odate){
                                                                                                if(err){
                                                                                                    console.log(err);
                                                                                                } else {
                                                                                                    res.render('homes.ejs', {odate:odate,oto:oto, ostop,ostop, oclass:oclass, ofrom:ofrom,flightn:flightn, flightp: allflightsortprice, flightt: allflightsorttime, flights: allflight, airlines: allairline, towns: alltown, countrys: allcountry});
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    }).sort({"price":1});
                                                }
                                            }).sort({"time":1});
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
            }
    });
});

app.get('/adminhome', isLoggedIn2,function(req, res){

        Flight.find({}, function(err, allflight){
            if(err){
                console.log(err);
            } else {
                Airline.find({}, function(err, allairline){
                    if(err){
                        console.log(err);
                    } else {
                        Town.find({}, function(err, alltown){
                            if(err){
                                console.log(err);
                            } else {
                                Country.find({}, function(err, allcountry){
                                    if(err){
                                        console.log(err);
                                    } else {
                                        Flight.find({}, function(err, flightn){
                                            if(err){
                                                console.log(err);
                                            } else {
                                                Flight.find({}, function(err, flighttime){
                                                    if(err){
                                                        console.log(err);
                                                    } else {
                                                        Flight.find({}, function(err, flightprice){
                                                            if(err){
                                                                console.log(err);
                                                            } else {
                                                                Flight.distinct('from', function(err, ofrom){
                                                                    if(err){
                                                                        console.log(err);
                                                                    } else {
                                                                        Flight.distinct('to', function(err, oto){
                                                                            if(err){
                                                                                console.log(err);
                                                                            } else {
                                                                                Flight.distinct('classF', function(err, oclass){
                                                                                    if(err){
                                                                                        console.log(err);
                                                                                    } else {
                                                                                        Flight.distinct('stop', function(err, ostop){
                                                                                            if(err){
                                                                                                console.log(err);
                                                                                            } else {
                                                                                                Flight.distinct('date', function(err, odate){
                                                                                                    if(err){
                                                                                                        console.log(err);
                                                                                                    } else {
                                                                                                            res.render('admin/home.ejs', {odate:odate,oto:oto, ostop,ostop, oclass:oclass, ofrom:ofrom,flightp :flightprice,flightt :flighttime,flightn:flightn,flights: allflight, airlines: allairline, towns: alltown, countrys: allcountry});
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }      
                                                        }).sort({"price":1});
                                                    }
                                                }).sort({"time":1});
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
                }
        });    
});

app.post('/adminhomeS', isLoggedIn2,function(req, res){
    var from = req.body.Sfrom;
    var to = req.body.Sto;
    var sclass = req.body.Sclass;
    var stop = req.body.Sstop;
    var dated = req.body.Sdated;
    var dateb = req.body.dateb;
    var num = req.body.Snum;
    Flight.find({}, function(err, allflight){
        if(err){
            console.log(err);
        } else {
            Airline.find({}, function(err, allairline){
                if(err){
                    console.log(err);
                } else {
                    Town.find({}, function(err, alltown){
                        if(err){
                            console.log(err);
                        } else {
                            Country.find({}, function(err, allcountry){
                                if(err){
                                    console.log(err);
                                } else {
                                    Flight.find({from:from,to:to,classF:sclass,stop:stop,date:dated}, function(err, flightn){
                                        if(err){
                                            console.log(err);
                                        } else {
                                            Flight.find({from:from,to:to,classF:sclass,stop:stop,date:dated}, function(err, flighttime){
                                                if(err){
                                                    console.log(err);
                                                } else {
                                                    Flight.find({from:from,to:to,classF:sclass,stop:stop,date:dated}, function(err, flightprice){
                                                        if(err){
                                                            console.log(err);
                                                        } else {
                                                            Flight.distinct('from', function(err, ofrom){
                                                                if(err){
                                                                    console.log(err);
                                                                } else {
                                                                    Flight.distinct('to', function(err, oto){
                                                                        if(err){
                                                                            console.log(err);
                                                                        } else {
                                                                            Flight.distinct('classF', function(err, oclass){
                                                                                if(err){
                                                                                    console.log(err);
                                                                                } else {
                                                                                    Flight.distinct('stop', function(err, ostop){
                                                                                        if(err){
                                                                                            console.log(err);
                                                                                        } else {
                                                                                            Flight.distinct('date', function(err, odate){
                                                                                                if(err){
                                                                                                    console.log(err);
                                                                                                } else {    
                                                                                                        res.render('admin/homeS.ejs', {odate:odate,oto:oto, ostop,ostop, oclass:oclass, ofrom:ofrom,flightp :flightprice,flightt :flighttime,flightn:flightn,flights: allflight, airlines: allairline, towns: alltown, countrys: allcountry});
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }      
                                                    }).sort({"price":1});
                                                }
                                            }).sort({"time":1});
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });    
});

app.post('/addflight',  isLoggedIn2, function(req, res){
    var airlinename = req.body.airlinename;
    Airline.findOne({airlinename : airlinename}, function(err, Fairline){
        if(err){
            console.log(err);
        } else {
            var from = req.body.FTname + " " + req.body.FCname;
            var to = req.body.TTname + " " + req.body.TCname;
            var time = req.body.time;
            var stop = req.body.stop;
            var seat = req.body.seat;
            var classF = req.body.Fclass;
            var departure = req.body.departure;
            var stop = req.body.stop;
            var price = req.body.price;
            var date = req.body.Fdate;
            var img =  Fairline.image;
            Flight.create({airlinename:airlinename,from:from,departure:departure,to:to,date:date,time:time,classF:classF,stop:stop, price:price,seat:seat,img:img }, function(err, Flight){
                if(err) {
                    console.log(err);
                } else {
                    console.log('New data added');
                    res.redirect('/adminhome');
                }
            });   
        }
    });
    
    
});

app.get('/country', isLoggedIn2, function(req, res){
    Country.find({}, function(err, allcountry){
        if(err){
            console.log(err);
        } else {
            res.render('admin/country.ejs', {countrys: allcountry});
        }
    });
});

app.post('/addcountry', isLoggedIn2,function(req, res){
    var countryname = req.body.Ncountry;
    Country.create({countryname:countryname}, function(err, Country){
        if(err) {
            console.log(err);
        } else {
            console.log('New data added');
            res.redirect('/country');
        }
    });
});

app.delete('/deletecountry/:id', isLoggedIn2, function(req, res){
    Country.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/country');
        } else {
            console.log('delete data');
            res.redirect('/country');
        }
    });
})

app.get('/town', isLoggedIn2, function(req, res){
    Town.find({}, function(err, alltown){
        if(err){
            console.log(err);
        } else {
            res.render('admin/town.ejs', {towns: alltown});
        }
    }).sort({"townname":1});
});

app.post('/addtown', isLoggedIn2,function(req, res){
    var townname = req.body.Ntown;
    Town.create({townname:townname}, function(err, Town){
        if(err) {
            console.log(err);
        } else {
            console.log('New data added');
            res.redirect('/town');
        }
    });
});

app.delete('/deletetown/:id',  isLoggedIn2,function(req, res){
    Town.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/town');
        } else {
            console.log('delete data');
            res.redirect('/town');
        }
    });
})

app.post('/registerA', isLoggedIn2, function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var newUser = new User({username:username, userclass: "admin"});
    User.register(newUser, password, function(err, user){
        if(err) {
            console.log(err);
            return res.render('admin/member.ejs');
        }
            res.redirect('/member');
    });
});

app.get('/member', isLoggedIn2, function(req, res){
    User.find({userclass : "admin"}, function(err, alladmin){
        if(err){
            console.log(err);
        } else {
            User.find({userclass:"member"}, function(err, alluser){
                if(err){
                    console.log(err);
                } else {
                    res.render('admin/member.ejs', {users: alluser, admin: alladmin});
                }
            });
        }
    });
    
});

app.get('/login' , function(req,res){
    res.render('login.ejs');
});

app.get('/booking' , isLoggedIn, function(req,res){
    Book.find({UserID:req.user._id}, function(err, allbook){
        if(err){
            console.log(err);
        } else {
            Flight.find({}, function(err, allflight){
                if(err){
                    console.log(err);
                } else {
                res.render('booking.ejs', {book: allbook,flight: allflight});
                }
            });
        }
    });
});

app.get('/:id/bookinfo' , isLoggedIn, function(req,res){
    Book.findById(req.params.id, function(err, allbook){
        if(err){
            console.log(err);
        } else {
            Flight.find({}, function(err, allflight){
                if(err){
                    console.log(err);
                } else {
                res.render('bookinfo.ejs', {book: allbook,flight: allflight});
                }
            });
        }
    });
});


app.get('/account' , isLoggedIn, function(req,res){
    res.render('account.ejs');
});


app.get('/accountV/:id' ,  isLoggedIn2,  function(req,res){
    User.findById(req.params.id , function(err, founduser){
        if(err){
            console.log(err);
        } else {
            res.render("admin/accountV.ejs", {user: founduser});
        }
    });
});

app.get('/:id/edit' , isLoggedIn,function(req,res){
    User.findById(req.params.id , function(err, founduser){
        if(err){
            console.log(err);
        } else {
            res.render("edit.ejs", {user: founduser});
        }
    });
});

app.put('/:id' , isLoggedIn, function(req,res){
    User.findByIdAndUpdate(req.params.id, req.body.useraccount, function(err, updateuser){
        if(err){
            res.redirect('/');
            console.log(err);
        } else {
            res.redirect('/account');
        }
    });
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

app.post('/:id/booking', isLoggedIn, function(req, res){
    var num = req.body.num;
    var pointr = req.body.rpoint;
    Book.create({ticket:num,point:pointr,flightid:req.params.id,UserID:req.user._id}, function(err, book){
        if(err) {
            console.log(err);
        } else {
            User.findByIdAndUpdate(req.user._id,{$inc : {point:pointr}},function(err, update){
                if(err) {
                    console.log(err);
                } else {
                    console.log('New dooking added');
                    res.redirect('/booking');
                }
            });
        }
    });
});

app.delete('/:id/cancel', isLoggedIn,function(req, res){
    Book.findById(req.params.id, function(err,book){
        if(err){
            console.log(err);
         } else {
            User.findByIdAndUpdate(req.user._id,{$inc : {point:book.point*-1}},function(err, update){
                if(err) {
                    console.log(err);
                } else {
                    Book.findByIdAndRemove(req.params.id, function(err){
                        if(err){
                            res.redirect('/booking');
                        } else {
                            console.log('delete data');
                            res.redirect('/booking');
                         }
                    });
                }
            });
        }
    });
})


app.get('/Ainfo/:id' , isLoggedIn2, function(req,res){
    Flight.findById(req.params.id , function(err, foundflight){
        if(err){
            console.log(err);
        } else {
            res.render("admin/Ainfo.ejs", {flight: foundflight});
        }
    });
});

app.get('/airline', isLoggedIn2,  function(req, res){
    Airline.find({}, function(err, allairline){
        if(err){
            console.log(err);
        } else {
            res.render('admin/airline.ejs', {airlines: allairline});
        }
    });
});

app.post('/addairline', isLoggedIn2, upload.single('Image'), function(req, res){
    var airlinename = req.body.Nairline;
    req.body.Image = '/uploads/'+req.file.filename;
    Airline.create({airlinename:airlinename,image:req.body.Image}, function(err, Airline){
        if(err) {
            console.log(err);
        } else {
            console.log('New data added');
            res.redirect('/airline');
        }
    });
});

app.delete('/deleteairline/:id', isLoggedIn2, function(req, res){
    Airline.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/airline');
        } else {
            console.log('delete data');
            res.redirect('/airline');
        }
    });
})

app.get('/:id/editA', isLoggedIn2,function(req,res){
    Flight.findById(req.params.id , function(err, foundflight){
        if(err){
            console.log(err);
        } else {
            res.render("admin/editA.ejs", {flight: foundflight});
        }
    });
});

app.put('/:id/conedit' , isLoggedIn2, function(req,res){
    User.findByIdAndUpdate(req.params.id, req.body.infoflight, function(err, updateflight){
        if(err){
            res.redirect('/adminhome');
            console.log(err);
        } else {
            res.redirect('/adminhome');
        }
    });
});

app.delete('/deleteflight/:id', isLoggedIn2, function(req, res){
    Flight.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/adminhome');
        } else {
            console.log('delete data');
            res.redirect('/adminhome');
        }
    });
})

app.post('/register', function(req, res){
    var username = req.body.email;
    var email = req.body.email;
    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    var numphone = req.body.numphone;
    var password = req.body.password;

    var newUser = new User({username:username, FirstName:Fname, LastName:Lname, PhoneNumber:numphone,email:email,point:"0",gender: "-",Age: "-",userclass: "member"});

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

app.post('/adminlog', passport.authenticate('local',   
    {   
        successRedirect: '/adminhome',
        failureRedirect: '/admin'
    }), function(res, res){       
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/logout2', function(req, res){
    req.logout();
    res.redirect('/admin');
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

function isLoggedIn2(req, res, next){
    if(req.isAuthenticated() && req.user.userclass == "admin"){
        return next();
    }
    res.redirect('/admin');
}

app.listen( 3000, function(req,res){
    console.log("The server has been connect by port : ");
});