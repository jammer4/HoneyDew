const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const dotenv = require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("stylesheets"));
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect(process.env.MONGO_DB_URI || 'mongodb+srv://jammer4:RomanHendrix1221@cluster0.qsmmt.mongodb.net/honeyDewDB?retryWrites=true&w=majority');
const itemSchema = {
    name: String,
};

const Item = mongoose.model('Item', itemSchema);

app.listen(process.env.PORT || 8000, () => {
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
        if (!err) {
            res.redirect('/');
        } else {
            res.redirect('/');
        }
    });
});