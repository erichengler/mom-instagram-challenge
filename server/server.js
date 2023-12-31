const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool');
const app = express();

const port = process.env.PORT || 5000

const winnersRouter = require('./routes/winners.router');

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parse incoming form data

app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/winners', winnersRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});