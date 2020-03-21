// Library
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
// Init app
const app = express();

// App using library
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {  
    let data = fs.readFileSync('./models/question.json');
    res.json({
        status: 200,
        message: 'Hello, World',
        data: JSON.parse(data)
    });
});

module.exports = { app };