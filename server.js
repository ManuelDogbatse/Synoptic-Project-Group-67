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
let data;

if (formFileDataJS.length == 0)
{
    formFileDataJS.push(
    {
        defaultValues: [
            {
                townName: "Bamaga",
                season: "Wet",
                temperature: "14",
                rainfall: "419",
                ph: "4.5",
                produce: [
                    "Crop1",
                    "Crop2"
                ]
            },
            {
                townName: "Mapoon",
                season: "Dry",
                temperature: "17",
                rainfall: "427",
                ph: "7",
                produce: [
                    "Crop3",
                    "Crop4"
                ]
            },
            {
                townName: "Weipa",
                season: "Wet",
                temperature: "17",
                rainfall: "443",
                ph: "8",
                produce: [
                    "Crop5",
                    "Crop6"
                ]
            },
            {
                townName: "Lockhart River",
                season: "Dry",
                temperature: "15",
                rainfall: "401",
                ph: "7.2",
                produce: "Crop7"
            },
            {
                townName: "Aurukun",
                season: "Wet",
                temperature: "14",
                rainfall: "398",
                ph: "6.8",
                produce: [
                    "Crop1",
                    "Crop3",
                    "Crop5"
                ]
            },
            {
                townName: "Coen",
                season: "Dry",
                temperature: "18",
                rainfall: "424",
                ph: "5.9",
                produce: [
                    "Crop2",
                    "Crop4",
                    "Crop6"
                ]
            },
            {
                townName: "Pormpuraaw",
                season: "Wet",
                temperature: "15",
                rainfall: "433",
                ph: "7.1",
                produce: [
                    "Crop3",
                    "Crop5",
                    "Crop7"
                ]
            },
            {
                townName: "Kowanyama",
                season: "Dry",
                temperature: "16",
                rainfall: "451",
                ph: "6.4",
                produce: [
                    "Crop1",
                    "Crop3",
                    "Crop6"
                ]
            },
            {
                townName: "Cooktown",
                season: "Wet",
                temperature: "17",
                rainfall: "456",
                ph: "6.1",
                produce: [
                    "Crop2",
                    "Crop4",
                    "Crop7"
                ]
            },
            {
                townName: "Cairns",
                season: "Dry",
                temperature: "14",
                rainfall: "444",
                ph: "7.2",
                produce: [
                    "Crop1",
                    "Crop2",
                    "Crop4",
                    "Crop7"
                ]
            },
            {
                townName: "Dimbulah",
                season: "Wet",
                temperature: "16",
                rainfall: "419",
                ph: "6.5",
                produce: [
                    "Crop2",
                    "Crop3",
                    "Crop6"
                ]
            },
            {
                townName: "Karumba",
                season: "Dry",
                temperature: "15",
                rainfall: "412",
                ph: "4.9",
                produce: "Crop7"
            },
            {
                townName: "Normanton",
                season: "Wet",
                temperature: "16",
                rainfall: "407",
                ph: "5.3",
                produce: "Crop3"
            }
        ],
        customValues: []
    });
    
    data = JSON.stringify(formFileDataJS, undefined, 4);
    fs.writeFileSync(formFilePath, data);
}

// Get request for index
app.get('/index', (req, res) => {
    res.render('index.ejs');
});

// Get request for form
app.get('/form', (req, res) => {
    res.render('form.ejs');
});

app.post('/form', (req, res) => {
    try {
        const formDataObj = 
        {
            townName: req.body.townName,
            season: req.body.season,
            temperature: req.body.temperature,
            rainfall: req.body.rainfall,
            ph: req.body.ph,
            produce: req.body.produce
        };

        formFileDataJS[0].customValues.push(formDataObj);

        // Write data to json file
        data = JSON.stringify(formFileDataJS, undefined, 4)
        fs.writeFileSync(formFilePath, data)

        if (req.body.ph <= 7)
        {
            res.redirect('/graph1')
        }
        else if (req.body.ph > 7 && req.body.ph <= 14)
        {
            res.redirect('/graph2')
        }
    }
    catch {
        res.redirect('/form');
    }
});

// Get request for graph
app.get('/graph1', (req, res) => {
    res.render('graph1.ejs');
});

app.get('/graph2', (req, res) => {
    res.render('graph2.ejs');
});

// Get request for about
app.get('/about', (req, res) => {
    res.render('about.ejs');
});

// Get request for about
app.get('/map', (req, res) => {
    res.render('map.ejs');
});
// Get request for home
app.get('/home', (req, res) => {
    res.render('home.ejs');
});

// Listen on port 4000
app.listen(4000);
