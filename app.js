const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const { stringify } = require('querystring');

mongoose.connect("mongodb://localhost:27017/honeyDewDB");
const itemSchema = {
    name: String,
};

const Item = mongoose.model('Item', itemSchema);

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("stylesheets"));
app.use(bodyParser.urlencoded({ extended: true}));

app.listen(8000, () => {
    console.log('Listening on port 8000')
});

app.get('/', (req, res) => {
    Item.find( {}, (err, f) => {
        res.render('index', { listItem: f });
    });
});

app.post('/', (req, res) => {
    const item = new Item({
        name: req.body.addTask,
    });
    item.save();
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    Item.findByIdAndRemove(req.body.checkbox, (err) => {
        res.redirect('/');
    });
});