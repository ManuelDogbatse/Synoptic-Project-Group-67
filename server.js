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
                produce: "Rice"
            },
            {
                townName: "Mapoon",
                season: "Dry",
                temperature: "17",
                rainfall: "427",
                ph: "7",
                produce: "Yam"
            },
            {
                townName: "Weipa",
                season: "Wet",
                temperature: "17",
                rainfall: "443",
                ph: "8",
                produce: "Sub Clover"
            },
            {
                townName: "Lockhart River",
                season: "Dry",
                temperature: "15",
                rainfall: "401",
                ph: "7.2",
                produce: "Sub Clover"
            },
            {
                townName: "Aurukun",
                season: "Wet",
                temperature: "14",
                rainfall: "398",
                ph: "6.8",
                produce: "Yam"
            },
            {
                townName: "Coen",
                season: "Dry",
                temperature: "18",
                rainfall: "424",
                ph: "5.9",
                produce: "Rice"
            },
            {
                townName: "Pormpuraaw",
                season: "Wet",
                temperature: "15",
                rainfall: "433",
                ph: "7.1",
                produce: "Sub Clover"
            },
            {
                townName: "Kowanyama",
                season: "Dry",
                temperature: "16",
                rainfall: "451",
                ph: "6.4",
                produce: "Yam"
            },
            {
                townName: "Cooktown",
                season: "Wet",
                temperature: "17",
                rainfall: "456",
                ph: "6.1",
                produce: "Yam"
            },
            {
                townName: "Cairns",
                season: "Dry",
                temperature: "14",
                rainfall: "444",
                ph: "7.2",
                produce: "Rice"
            },
            {
                townName: "Dimbulah",
                season: "Wet",
                temperature: "16",
                rainfall: "419",
                ph: "6.5",
                produce: "Sub Clover"
            },
            {
                townName: "Karumba",
                season: "Dry",
                temperature: "15",
                rainfall: "412",
                ph: "4.9",
                produce: "Rice"
            },
            {
                townName: "Normanton",
                season: "Wet",
                temperature: "16",
                rainfall: "407",
                ph: "5.3",
                produce: "Yam"
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

        if (req.body.produce == "Rice")
        {
            res.redirect('/rice')
        }
        else if (req.body.produce == "Yam")
        {
            res.redirect('/yam')
        }
        else
        {
            res.redirect('/subclover')
        }
    }
    catch {
        res.redirect('/form');
    }
});

// Get request for graph
app.get('/rice', (req, res) => {
    res.render('rice.ejs');
});

app.get('/yam', (req, res) => {
    res.render('yam.ejs');
});

app.get('/subclover', (req, res) => {
    res.render('subclover.ejs');
});

// Get request for about
app.get('/about', (req, res) => {
    res.render('about.ejs');
});

// Get request for map
app.get('/map', (req, res) => {
    res.render('map.ejs');
});
// Get request for home
app.get('/home', (req, res) => {
    res.render('home.ejs');
});

// Listen on port 4000
app.listen(4000);