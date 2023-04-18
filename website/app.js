/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = 'ff388d9bdb42481d2d7780c7e902cf49&units=imperial';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

async function getWeather(baseUrl, zip, apiKey){
    var apiUrl = baseUrl + zip + ',my&appId=' + apiKey;
    const res = await fetch(apiUrl);
    var data = await res.json();
    return data;
}

async function postWeather(url = "", data = {}){
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        var data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

async function setUI(){
    var res = await fetch('/getProjectData');
    var data = await res.json();
    
    document.getElementById('temp').innerHTML = Math.round(data.temperature)+ ' degrees';
    document.getElementById('content').innerHTML = data.userResponse;
    document.getElementById("date").innerHTML = data.date;
}

document.getElementById('generate').addEventListener('click', function(){
    var zip = document.getElementById('zip').value;
    getWeather(baseUrl, zip, apiKey)
    .then(async function(data){
        var weatherData = {};
        weatherData.temperature = data.main.temp;
        weatherData.date = new Date();
        weatherData.userResponse = document.getElementById('feelings').value;
        await postWeather('/addProjectData', weatherData);
    })
    .then(function(){
        setUI();
    });
})