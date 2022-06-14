// Initialization
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const fs = require('fs')

// Middleware and Static files
app.use(bodyParser.json());                          //Using body parser to handle form data
app.use(bodyParser.urlencoded({ extended: false }));    //Avoids data from becoming URL encoded
app.use(express.static('public'));
app.use('/js', express.static(__dirname + 'public/js'))

// JSON File
const formFilePath = "public/data/form.json";
let formFileDataJSON = fs.readFileSync(formFilePath);
let formFileDataJS = JSON.parse(formFileDataJSON);

// Get request for index
app.get('/index', (req, res) => {
    res.render('index.ejs');
});

// Get request for form
app.get('/form', (req, res) => {
    res.render('form.ejs');
});

// Get request for graph
app.get('/graph', (req, res) => {
    res.render('graph.ejs');
});

// Get request for about
app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.post('/form', (req, res) => {
    try {

        formFileDataJS.push({
            townName: req.body.townName,
            season: req.body.season,
            temperature: req.body.temperature,
            temperatureUnit: req.body.temperatureUnit,
            rainfall: req.body.rainfall,
            ph: req.body.ph,
            produce: req.body.produce
        })

        // Write data to json file
        let data = JSON.stringify(formFileDataJS, undefined, 4)
        fs.writeFileSync(formFilePath, data)

        res.redirect('/form');

    }
    catch {
        res.redirect('/form');
    }

    for (let i = 0; i < formFileDataJS.length; i++)
    {
        console.log("Object "+i+":\n");
        console.log("Town Name: "+formFileDataJS[i].townName+"\n"+
                    "Season: "+formFileDataJS[i].season+"\n"+
                    "Temperature: "+formFileDataJS[i].temperature+"\n"+
                    "Temperature Unit : "+formFileDataJS[i].temperatureUnit+"\n"+
                    "Rainfall: "+formFileDataJS[i].rainfall+"\n"+
                    "pH: "+formFileDataJS[i].ph+"\n"+
                    "Produce: "+formFileDataJS[i].produce+"\n");
    }
    
});

// Listen on port 4000
app.listen(4000);
