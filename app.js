const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const db = process.env.MongoURI;
app.use('/', require('./routes'));

const port = process.env.PORT || 8000;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB is connected');
        app.listen(port, () => {
            console.log(`Server is running ${port}`);
        });
    })
    .catch(err => console.log(err));