'use strict';
const express = require('express');
const app = express();
const registerRoutes = require('./routes');

// server config
const port = process.env.PORT || 3000;

// Expose public directory with static resources
app.use(express.static('public'));

// register routes
registerRoutes(app);

// Redirect to home page by default
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

// create server start method
const start = () => {
    return new Promise((resolve, reject) => {
        // start the server
        app.listen(port, () => {
            console.log(`Connected to Port ${port}`);
            resolve()
        });
    }).catch((error) => {
        console.log(`failed to start server => ${error.message}`)
    });
}

module.exports = start;


