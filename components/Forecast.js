const Forecast = require('../models/Forecast.model');
require('dotenv').config();
const WEATHERBIT_KEY = process.env.WEATHER_API_KEY;
const axios = require('axios');


const getWeather = async (request, response) => {
    try {

        const lat=request.query.lat;
        const lon=request.query.lon;

        const url=`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT_KEY}&lat=${lat}&lon=${lon}`
        const response = await axios.get(url);
        console.log(url);
        const data = response.data.data.map(item => new Forecast(item));
        response.json(data);
        response.send(' WEATHER');
        

    }
    
    catch (e) {
        response.status(404).send('ERROR: INVALID INPUT');       
    }
    
}
module.exports = getWeather;