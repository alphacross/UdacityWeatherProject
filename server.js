// Setup empty JS object to act as endpoint for all routes
projectData = {};
var port = 8000;

// Require Express to run server and routes
var express = require('express');

// Start up an instance of app
var app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
var cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.listen(port, function(){
    console.log('listening on port ' + port);
})

app.get('/getProjectData', function(req, res){
    res.send(projectData);
})

app.post('/addProjectData', function(req, res){
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    res.send(projectData);
})