"use strict";

console.log('client side js');
const icon = document.querySelector('.currentImg');
const bgImage = document.querySelector('.bgImage');
const weatherForm = document.querySelectorAll('form');
const inputData = document.querySelectorAll('.input-data');
const content = document.querySelector('.content');
const form1 = document.querySelector('.form1');
const form2 = document.querySelector('.form2');
const outer = document.querySelector('.outer');
const heading = document.querySelector('.heading');
const result = document.querySelector('.result');
const weatherDescription = document.querySelector('.weather-description');
const temperature = document.querySelector('.temperature')



const getWeatherData = (url) => {
    fetch(url).then(response => {
        response.json().then(data => {           
            result.classList.remove('hidden')
            if (data.error) {
                console.log(data.error);   
                result.innerHTML='';             
                result.innerHTML = data.error;
                content.classList.add('hidden');
                form1.classList.add('hidden');
                form2.classList.remove('hidden');
                heading.classList.remove('hidden')
                outer.style.display = 'block';
                bgImage.style.backgroundImage = 'url(/pictures/first.jpg)'
                temperature.classList.add('hidden');

            } else {
                console.log(data);
                for (let i = 0; i <= 6; i++) {
                    const date = document.querySelector(`.day${i}`);
                    const image = document.querySelector(`.img${i}`);
                    const temp = document.querySelector(`.temp${i}`);
                    const desc = document.querySelector(`.desc${i}`);
                    date.innerHTML = '';
                    temp.innerHTML = '';
                    desc.innerHTML = '';
                    date.insertAdjacentText('afterbegin', data.forecastData[i].date);
                    image.src = `/icons/${data.forecastData[i].icon}.png`;
                    temp.insertAdjacentText('beforeend', `${data.forecastData[i].temp} °C`);
                    let s = ((data.forecastData[i].icon).split('-')).join(' ')
                    let description = s.charAt(0).toUpperCase() + s.slice(1);
                    desc.insertAdjacentText('beforeend', description);
                    bgImage.style.backgroundImage = `url(/pictures/${data.bgImg}.jpg)`;
                }
                document.querySelector('.day0').innerHTML = '';
                document.querySelector('.day0').innerHTML = 'Today';
                document.querySelector('.day1').innerHTML = '';
                document.querySelector('.day1').innerHTML = 'Tomorrow';
                temperature.classList.remove('hidden');
                temperature.innerHTML = data.forecastData[0].temp + '°C';
                content.classList.remove('hidden');
                form1.classList.remove('hidden');
                form2.classList.add('hidden');
                heading.classList.add('hidden')
                outer.style.display = 'flex';
                result.innerHTML = data.location;
                weatherDescription.innerHTML='';
                weatherDescription.innerHTML = data.current;
            }
        })
    })
}



for (let i = 0; i <= 1; i++) {
    weatherForm[i].addEventListener('submit', function (e) {
        e.preventDefault();
        let location = inputData[i].value;
        inputData[i].value = '';
        console.log(location);
        let weatherData = getWeatherData(`/weather?address=${location}`);

    })
}


