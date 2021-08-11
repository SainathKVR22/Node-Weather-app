const request = require('request');

const weather = (latitude,longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=c1c1fdf81444c876c3a63333e12c1bc2&query=' + latitude +',' + longitude;

    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('Unable to connect weather app',undefined);
        }else if(response.body.current.length === 0)
        {
            callback('Unable to find location', undefined);
        }else{
            callback(undefined,response.body.current.weather_descriptions[0]+ '. It is currently ' + response.body.current.temperature + ' degress out. There is a ' + response.body.current.precip+ '% chance of rain.')
        }
    })
}


module.exports = weather;