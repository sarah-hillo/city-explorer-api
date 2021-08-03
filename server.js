const { request, response } = require('express');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const axios = require('axios');


const weatherData = require('./data/weather.json');

app.get('/', (request, response) => {
    response.send('created')
});

app.get('/weather', (request, response) => {

    let weatherData = weather.find(item => {
        const lon = request.query.lon;
        const lat = request.query.lat;
        const searchQuery = request.query.searchQuery;
        if (item.city_name == searchQuery || item.lon == lon || item.lat == lat) {
            console.log(item.city_name);
            return item.city_name;
        } else {
            return 'not found';
        }
    });

                    class Forecast {
                        constructor(datetime, description) {
                            this.datetime = datetime;
                            this.description = description;
                        }
                    }
               let forcastArr = [];
                    weatherData.data.map((item) => {


                        forcastArr.push(new Forecast(` date${item.weather.datetime} description ${item.weather.description}`))
                    });

                    response.send(forcastArr);

                });

                app.listen(PORT, () => {

                    console.log(`the port ${PORT}`);

                });

            