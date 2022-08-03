//handlebars for creating dynamic webpages. It also allows to create code that can be reused across webpages
const path = require('path');         //to find paths of directories
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const { response } = require('express');
const { request } = require('http');
const weather = require('./utils/weather');

//define path for exprss config
const publicDirectoryPath = path.join(__dirname, '../public');    //join and find paths to html document
const viewsPath = path.join(__dirname, '../templates/views');           //custom path for views folder
const partialsPath = path.join(__dirname, '../templates/partials');      //we keep common html in this folder so we can reuse it instead of typing again and again

const app = express();    //express is only a single function, not an object
const port = process.env.PORT || 3000 

//when a user specifies the route(part of url) in the string, what has to be done (eg sending html, json file etc) is dicided by the callback function
//the object passed to function is called req, short for request. other argument is the response


//Now when we're working with EXPRESS, it expects all of your views in this case are HANDLEBARS templates to live in a specific folder that is in the route of the project.
//It's supposed to live in a folder called Views.


//setup handlebars engine and views location
app.set('view engine', 'hbs')                                  //tell express which templating engine we are using
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);                             //for using partial files

// Setup static dierctory to serve
app.use(express.static(publicDirectoryPath));                   //serve the directory. static takes the path of folder we want to use. static means static webpage. not dynamic


//this code will nover run cuz we used app.use
//index.html will replace root code, about.html will replace about code and so on
// app.get('', (req, res)=>{                
//     res.send('Hello express');             //send something back eg what has to be displayed in the browser window. if we send an object it will automatically be stringified
// });

// app.get('/help', (req, res) => {
//     res.send({
//         name : 'osama',
//         college : 'nitk',
//     });
// });

// app.get('/about', (req, res) => {
//     res.send('<h1>THIS IS THE ABOUT PAGE</h1>');
// });


app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome to Weather App',
        name: 'Mohammed Osama Mudassir',
    });                          //we use render for dynamic webpages. name should be same as ilename. next is an object which can be used in the hbs file
});

app.get('/about', (req, res) => { 
    res.render('about', {
        title: 'I am Mohammed Osama',
        name: 'I am a student at National Institute of Technology Karnataka',
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Contact for help',
        name: 'abcd@gmail.com',
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Enter a search term',
        });
    }
    // res.send(req.query.address);
    geocode(req.query.address, (error, geoData) => {
        if(error)
            return res.send(error);

        weather(geoData.latitude, geoData.longitude, (error, weatherData) => {
            //res.send(data);
            if(error)
             return res.send(error);
            
            return res.send({
                location: geoData.Place_name,
                current: weatherData.currentDesc,
                forecast: weatherData.forecast,
                bgImg : weatherData.bgImg,
                forecastData : weatherData.forecastData,                
            });
        });
    });

});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help not found FUUUUU',
        name: 'Mohammed Osama Mudassir',
    });
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Mohammed Osama Mudassir',
    });
})

//this fires only one time. it says use local host 3000. callback function is optional. we can use it to show if the server is running. starting the server is a synchronous process
app.listen(port, () => {
    console.log('server is up on port' + port);
})

//server will not close on its own. its job is to be up and running and listen for new requests









//we can use directly app.get and write html there
//we can remove the first part and say app.use(directory) and write html files there. the url will become localhost3000/index.html etc
//or we can use hbs and write app.set. In a views folder we can write dynamic hbs files. These have to be called using app.get

//browser provides a query string -> server reads the query string
//http://localhost:3000/weather?search=osama