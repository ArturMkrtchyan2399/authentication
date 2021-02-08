const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('dotenv').config();
const db = process.env.MongoURI;

app.use('/', require('./routes/index.js'));

app.on('ready', () => {
    app.listen(8000, () => {
        console.log("Server is running...");
    });
});

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB is connected');
        app.emit('ready');
    })
    .catch(err => console.log(err));