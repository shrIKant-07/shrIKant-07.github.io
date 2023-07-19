const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const loc = document.querySelector('.loc');
const pressure = document.getElementById('pressure');
const feels_like = document.getElementById('feels_like'); 
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    const api_key = "2d352bcebd310d126d311c402f479520";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    loc.innerHTML = `  ${weather_data.name} [${weather_data.sys.country}] `;
    feels_like.innerHTML =  `${Math.round(weather_data.main.feels_like - 273.15)}°C`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    pressure.innerHTML = `${weather_data.main.pressure} hPa`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "assets/cloud.svg";
            break;
        case 'Clear':
            weather_img.src = "assets/clear.svg";
            break;
        case 'Rain':
            weather_img.src = "assets/rain.svg";
            break;
        case 'Mist':
            weather_img.src = "assets/mist.svg";
            break;
        case 'Snow':
            weather_img.src = "assets/snow.svg";
            break;

    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', () =>{
    checkWeather(inputBox.value);
});