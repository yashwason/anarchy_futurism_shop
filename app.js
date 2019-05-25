require(`dotenv`).config({path:`process.env`});

// Required packages
const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require(`body-parser`),
    mongoose = require(`mongoose`);

    
// DB Setup
// mongoose.connect(`mongodb://localhost:27017/anarchy_futurism`, {
//     useNewUrlParser: true
// });


// Router files
const ROUTES = require(`./routes/index`),
    PRODUCTSROUTES = require(`./routes/category`),
    PRODUCTROUTES = require(`./routes/product`);


// App configurations
app.set(`view engine`, `ejs`);
app.use(express.static(__dirname + `/public`));
app.use(morgan(':method :url - :status - :response-time ms')); // logging http activity
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Using routes
app.use(ROUTES);
app.use(`/product`, PRODUCTROUTES);
app.use(`/products`, PRODUCTSROUTES);


// Server setup
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});