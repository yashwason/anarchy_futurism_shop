require(`dotenv`).config({path:`process.env`});

// Required packages
const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require(`body-parser`),
    mongoose = require(`mongoose`),
    session = require(`express-session`),
    MongoStore = require(`connect-mongo`)(session),
    passport = require(`passport`),
    flash = require(`connect-flash`);

    
// DB Setup
require(`./config/mongoose`);


// Configurating PassportJs for authentication
require(`./config/passport`);


// App configurations
app.set(`view engine`, `ejs`);
app.use(express.static(__dirname + `/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: `h682scdf75g6fd54gf56dh6ev465fdgxv6gf8d1s5fdg57g6565fhd68`,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 3 * 24 * 60 * 60 // 3 days
    }),
    cookie: {maxAge: 3 * 24 * 60 * 60 * 1000} // 3 days
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

if(process.env.MODE === `dev`){
    app.use(morgan(':method :url - :status - :response-time ms')); // logging http activity
}


// Routes
const routes = require(`./routes/_all`);
app.use(routes);


// Server setup
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});