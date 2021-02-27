const express = require('express'); // Express App
const dotenv = require('dotenv'); // Maintaining configuration files
const morgan = require('morgan'); // log requests
const bodyparser = require('body-parser');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 3000

// passport config
require('./server/config/passport')(passport);

// log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

// parse request to body parser
app.use(bodyparser.urlencoded({ extended: true }))

// set view engine
app.set("view engine", "ejs") // Other options: html, pug
//app.set("views", path.resolve(__dirname,"views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/docs', express.static(path.resolve(__dirname, "assets/docs")))
app.use(express.static(__dirname+'/public'));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});



// load router
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});