const request = require('request')


const geocode = function (address, callback) {

    // let geocodeURL = `http://api.positionstack.com/v1/forward?access_key=6e5b27d5395c51737a97b22a74322c72&query=${address}`;
    let geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=01866d52eb9c4d7d854c4b64915e3df5&language=en&pretty=1&no_annotations=1`;

    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback({
                error: 'Unable to connect to location services!'
            }, undefined)
        } else if (response.body.results.length === 0) {
            callback({
                error: 'Unable to find location. Try another search.'
            }, undefined)
        } else {
            const location = {
                latitude: response.body.results[0].geometry.lat,
                longitude: response.body.results[0].geometry.lng,
                Place_name: response.body.results[0].formatted,
            }
            // console.log(location);
            callback(undefined, location)
        }

    })
}


module.exports = geocode;