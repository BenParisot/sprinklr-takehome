export const fetchWeather = async (zip) => {
    let keyResponse = await fetch(`https://dataservice.accuweather.com/locations/v1/postalcodes/US/search?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH&q=${zip}`);
    let keyData = await keyResponse.json();
    if(keyData.length === 0) return null;
    else {
        let weatherResponse = await fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${keyData[0].ParentCity.Key}?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH`)
        let weatherData = await weatherResponse.json();
        const weatherObject = {
            cityData: keyData,
            weatherData: weatherData
        }
        return weatherObject;
    }
}
