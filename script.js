// Main elements
const global = (() => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=e70c4808ac1133f54b81a476f27aef6c'
    const searchButton = document.querySelector('#search-button');
    const cityInput = document.querySelector('input');

    return {
        url,
        searchButton,
        cityInput,
    }
})();

// Functionality
const functions = (() => { 
    const search = () => {
        let cityName = global.cityInput.value;
        let currentUrl = global.url.replace(`{city name}`, cityName);
    
        getWeather(currentUrl); 
    };
    
    const getWeather = async (currentUrl) => {
        try{

            let response = await fetch(currentUrl, {mode: 'cors'});
            let data = await response.json();

            renderDataOnDom(data);

        } catch (err) {
            alert('City name not found');
        };
    };

    function removeExistingDataFromDom() {
        let element = document.querySelector('.container');
        if(element){element.remove()};
    };

    function getDirection(number) {
        if(number < 22.5 || number >= 337.5){ return 'N'};
        if(number >= 22.5 && number < 67.5){ return 'NE'};
        if(number >= 67.5 && number < 112.5){ return 'E'};
        if(number >= 112.5 && number < 157.5){ return 'SE'};
        if(number >= 157.5 && number < 202.5){ return 'S'};
        if(number >= 202.5 && number < 247.5){ return 'SW'};
        if(number >= 247.5 && number < 292.5){ return 'W'};
        if(number >= 292.5 && number < 337.5){ return 'NW'};
    };

    function renderDataOnDom(data) {
        removeExistingDataFromDom();
        const webpage = document.querySelector('section');
        const container = document.createElement('div');
        container.classList.add('container');

        container.innerHTML = `
            <p id="city-and-country">${data.name}, ${data.sys.country}</p>
            <div id="weather-data">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0]["icon"]}.svg">
                <p id="weather-description">${data.weather[0].description}</p>
            </div>
            <p id="temperature">Temperature: ${Math.round(data.main.temp - 272.15) + ' °C'}</p>
            <p id="wind">Wind: ${data.wind.speed + ' km/h'}, ${getDirection(data.wind.deg)}</p>
            <p id="air-pressure">Air pressure: ${data.main.pressure + ' mbar'}</p>
            <p id="humidity">Humidity: ${data.main.humidity + '%'}</p>
        `

        webpage.append(container);
    };

    return{
        search,
        getWeather,
    };
})();






// Event listeners
const eventListeners = (() => { 
    global.searchButton.addEventListener('click', functions.search)
})();
