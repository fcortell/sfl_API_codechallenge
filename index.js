const express = require('express')
var path = require('path');

var index = require('./routes/index');
var stats = require('./routes/stats');
var maximize = require('./routes/maximize');

const app = express()

const port = 3000;

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/stats', stats);
app.use('/maximize', maximize);

process.on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
});

process.on('unhandledRejection', (error, promise) => {
    console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
    console.log(' The error was: ', error);
});
app.listen(port, () => {
    console.log(`sfl API listening at http://localhost:${port}`) //  Template string -> interpolation
});

module.exports = app;