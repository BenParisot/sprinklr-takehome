export const fetchWeather = async (zip) => {
    console.log('zip', zip);
    let keyResponse = await fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/US/search?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH&q=${zip}`);
    let keyData = await keyResponse.json();
    console.log('key data', keyData);
    let weatherResponse = await fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${keyData[0].ParentCity.Key}?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH`)
    let weatherData = await weatherResponse.json();
    const weatherObject = {
        cityData: keyData,
        weatherData: weatherData
    }
    return weatherObject;
    
}
