export const fetchWeather = async (zip) => {
    let keyResponse = await fetch(`https://dataservice.accuweather.com/locations/v1/postalcodes/US/search?apikey=lQQRp0lpAFwmdth6WndYEFAZI8Z2EcVl&q=${zip}`);
    console.log('key response', typeof(keyResponse.status));
    if (keyResponse.status !== 200) return keyResponse.status;
    else {
        let keyData = await keyResponse.json();
        if (keyData.length === 0) return null;
        else {
            let weatherResponse = await fetch(`https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${keyData[0].ParentCity.Key}?apikey=lQQRp0lpAFwmdth6WndYEFAZI8Z2EcVl`)
            let weatherData = await weatherResponse.json();
            const weatherObject = {
                cityData: keyData,
                weatherData: weatherData
            }
            return weatherObject;
        }
    }
}
