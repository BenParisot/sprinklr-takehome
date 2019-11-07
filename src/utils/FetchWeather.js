export const fetchWeather = async (zip) => {
    let keyResponse = await fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/US/search?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH&q=${zip}`, { mode: 'cors' });
    let keyData = await keyResponse.json();
    let weatherResponse = await fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${keyData[0].ParentCity.Key}?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH`, { mode: 'cors' })
    let weatherData = await weatherResponse.json();
    const weatherObject = {
        cityData: keyData,
        weatherData: weatherData
    }
    return weatherObject;
    
}
