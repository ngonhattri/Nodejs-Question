// Library
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
// Init app
const app = express();

// App using library
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    const {
        category,
        difficulty,
        amount
    } = req.query;
    let data = fs.readFileSync('./models/question.json');
    data = JSON.parse(data)
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }

    if (category) {
        data = data.filter(x => x.category === category)
    }
    if (difficulty) {
        data = data.filter(x => x.difficulty == difficulty)
    }
    if (amount) {
        let amountNumber = Number(amount);
        if (data.length !== 0 && data.length >= amountNumber) {
            data = data.splice(0, amountNumber)
        }
        if (data.length < amountNumber) {
            data.length = 0
        }
    }


    res.json({
        status: 200,
        message: 'Hello, World',
        data: data
    });
});

module.exports = {
    app
};