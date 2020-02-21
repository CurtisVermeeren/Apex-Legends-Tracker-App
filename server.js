const express = require('express');
const morgan  = require('morgan');
const dotenv = require('dotenv');

// Load the config
dotenv.config({path:'./config.env'});

const app = express();

// Dev logging using morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
}

// Profile routes
app.use('/api/v1/profile', require('./routes/profile'))

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    })
}

const port = process.env.PORT || 8000;
const environment = process.env.NODE_ENV

app.listen(port, () => {
    console.log(`App listening on port ${port} in ${environment} mode!`);
});