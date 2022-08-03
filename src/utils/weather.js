const request = require('request');

const ros = (time, icon) => {
    if (icon.slice(-3) === 'day' || icon.slice(-5) === 'night') return '';
    const hour = Number(time.slice(0, 2));
    if (hour >= 6 && hour <= 18) return '-day';
    return '-night';
}

const weather = function (lat, lon, callback) {
    let weatherURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C${lon}?unitGroup=metric&key=EFV6C7LBS7BA5HFXPC32JCWKX&contentType=json`;

    request({ url: weatherURL }, (error, response) => {
        if (error) {
            callback({
                error: 'Could not connect to the weather services'
            }, undefined);
        } else if (response.body[0] != '{') {
            callback({
                error: response.body
            }, undefined)
        } else {
            let weatherData = JSON.parse(response.body);
            let time = '';
            callback(undefined, {
                currentDesc: `The temperature is around ${weatherData.days[0].temp} degrees. It feels like ${weatherData.days[0].feelslike} degrees. The weather today is likely to be ${weatherData.days[0].description} The humidity is ${weatherData.days[0].humidity}%. Chance of precipitation is ${weatherData.days[0].precipprob}%`,
                forecast: `${weatherData.description}`,
                bgImg: `${weatherData.currentConditions.icon + ros(weatherData.currentConditions.datetime, weatherData.currentConditions.icon)}`,
                forecastData: [
                    {
                        date: weatherData.days[0].datetime,
                        temp: weatherData.days[0].temp,
                        icon: weatherData.days[0].icon,
                    },
                    {
                        date: weatherData.days[1].datetime,
                        temp: weatherData.days[1].temp,
                        icon: weatherData.days[1].icon,
                    },
                    {
                        date: weatherData.days[2].datetime,
                        temp: weatherData.days[2].temp,
                        icon: weatherData.days[2].icon,
                    },
                    {
                        date: weatherData.days[3].datetime,
                        temp: weatherData.days[3].temp,
                        icon: weatherData.days[3].icon,
                    },
                    {
                        date: weatherData.days[4].datetime,
                        temp: weatherData.days[4].temp,
                        icon: weatherData.days[4].icon,
                    },
                    {
                        date: weatherData.days[5].datetime,
                        temp: weatherData.days[5].temp,
                        icon: weatherData.days[5].icon,
                    },
                    {
                        date: weatherData.days[6].datetime,
                        temp: weatherData.days[6].temp,
                        icon: weatherData.days[6].icon,
                    },
                ],
            })

        }
    })
}

module.exports = weather;