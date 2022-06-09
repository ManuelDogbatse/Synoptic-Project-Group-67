// Initialization
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const fs = require('fs')

// Middleware
app.use(bodyParser.json());                          //Using body parser to handle form data
app.use(bodyParser.urlencoded({extended:false}));    //Avoids data from becoming URL encoded
app.use(express.static('public'));

// JSON File
let rawdata = fs.readFileSync('public/data/form.json');
let form = JSON.parse(rawdata);

// Get request for index
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Get request for form
app.get('/form', (req, res) => {
    res.render('form.ejs');
});

app.post('/form', (req, res) => {
    try{
        form.push({
            question1 : req.body.question1
        })

        // write data to json file
        let data = JSON.stringify(form, undefined, 4)
        fs.writeFileSync('public/data/form.json', data)

        res.redirect('/');

    }catch{
        res.redirect('/');
    }
});

// Listen on port 3000
app.listen(3000);