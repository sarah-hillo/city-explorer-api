const Movies = require('../models/Movies.model');
require('dotenv').config();
const axios = require('axios');
const MOVIES_KEY = process.env.MOVIE_API_KEY;
const Cache = require('../helpers/cache.helper');
let cacheObject = new Cache();


// const getMovies= async (request, response) => {
//     try{ 
//         // const query=request.query.location;
//         const moviesUrl=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
//         const moviesResponse = await axios.get(moviesUrl);    
//         const movies = moviesResponse.data.results;
//         let moviesArr = movies.data.map((item) => {
//             return new Movies(item)
//         });
//         response.json(moviesArr)
        
//     }
//     catch(e){
//         response.status(404).send('ERROR: INVALID INPUT');
        
//     }
    
// };

const getMoviesData = async (query) => {
    query = query;
    const moviesUrl = `http://api.themoviedb.org/3/search/movie?api_key=${MOVIES_KEY}&query=${query}`;
    const moviesResponse = await axios.get(moviesUrl);
    const moviesData = moviesResponse.data.results.map(element => new Movie(element));
    cacheObject.forecast.push({
      "query": query,
      "data": moviesData
    });
  
    return moviesData;
  
  };
  
  const getMovies = async (request, response) => {
    query = request.query.query;

    if (((Date.now() - cacheObject.timeStamp) > 86400000)) {
     
      cacheObject = new Cache();
    }
    
    if (cacheObject.movies.length) {
  
      const filteredMoviesData = cacheObject.movies.find((location) => {
        return location.query === query
      }); 
      if (filteredMoviesData) {
        
        response.json(filteredMoviesData.data);
      } else {
       
        response.json(await getMoviesData(query));
      }
    } else {
  
      response.json(await getMoviesData(query));
    }
  
  }


module.exports = getMovies;