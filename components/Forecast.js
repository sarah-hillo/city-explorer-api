const Forecast = require('../models/Forecast.model');
require('dotenv').config();
const WEATHERBIT_KEY = process.env.WEATHER_API_KEY;
const axios = require('axios');
const Cache = require('../helpers/cache.helper');
let cacheObject = new Cache();


// const getWeather = async (request, response) => {
//     try {

//         const lat=request.query.lat;
//         const lon=request.query.lon;

//         const url=`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT_KEY}&lat=${lat}&lon=${lon}`
//         const response = await axios.get(url);
//         console.log(url);
//         const data = response.data.data.map(item => new Forecast(item));
//         response.json(data);
//         response.send(' WEATHER');
        

        

//     }
    
//     catch (e) {
//         response.status(404).send('ERROR: INVALID INPUT');       
//     }
    
// }
const getWeatherData = async (lat, lon) => {
    lat = lat;
    lon = lon;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHERBIT_KEY}&lat=${lat}&lon=${lon}`
    const weatherResponse = await axios.get(url);
    const data = weatherResponse.data.data.map(item => new Forecast(item));
  
    cacheObject.forecast.push({
      "lat": lat,
      "lon": lon,
      "data": data,
    });
  
    return data;
  }
  const getWeather = async (request, response) => {
    const { lat, lon } = request.query;

    if (((Date.now() - cacheObject.timeStamp) > 86400000)) {
      cacheObject = new Cache();
    }
  
    if (cacheObject.forecast.length) {
  
      const filteredData = cacheObject.forecast.find((location) => {
        return location.lat === lat && location.lon === lon
      });
  
      if (filteredData) {
        response.json(filteredData.data);
      } else {
        response.json(await getWeatherData(lat, lon));
      }
    } else {
      response.json(await getWeatherData(lat, lon));
    }
  
  }
  


module.exports = getWeather;