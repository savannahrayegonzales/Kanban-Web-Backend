const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
var cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');
const passport = require('passport');
const path =require('path');
var cors = require("cors");


                                                   
const app = express();

//set up view engine
app.set("views", path.join(__dirname, "views"));
app.set('view engine','ejs');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));






//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb')
})

//set up routes
app.use('/auth',authRoutes);
app.use('/profile', profileRoutes);

//create home route
app.get('/',(req,res) => {
    res.render('home',{user: req.user});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

// app.listen(2000, () => {
//     console.log('app now listening for requests on port 2000');
// });

module.exports = app; 