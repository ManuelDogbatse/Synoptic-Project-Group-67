// Initialization
const express = require('express')
const app = express()
var bodyParser = require('body-parser'); 

app.use(bodyParser.json());                         //Using body parser to handle form data
app.use(bodyParser.urlencoded({extended:false}))    //Avoids data from becoming URL encoded
app.use(express.static('public')); 
app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs',)
})

// Listen on port 3000
app.listen(3000)