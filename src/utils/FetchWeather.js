export const fetchWeather = (zip) => {
    return fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/US/search?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH&q=${zip}`)
        .then(res => ([res.ok, res.json()]))
        .then(([ok, json]) => {
            console.log('json', json);
            return fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${json.results[0].ParentCity.Key}?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH`)
                .then(res => ([res.okay, res.json()]))
                .then(([ok, json]) => {
                    if (!ok) throw 'Sorry, we could not fetch the weather right now';
                    return json;
                });
        });
};

// export const fetchWeather = (id) => {
//     return fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${id}?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH`)
//     .then(res => ([res.okay, res.json()]))
//     .then(([ok, json]) => {
//         if (!ok) throw 'Sorry, we could not fetch the weather right now';
//         return json;
//     });
// };

export const fetchAsyncWeather = async (zip) => {
    let keyResponse = await fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/US/search?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH&q=${zip}`);
    let keyData = await keyResponse.json();
    let weatherResponse = await fetch(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${keyData[0].ParentCity.Key}?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH`)
    let weatherData = await weatherResponse.json();
    return weatherData;
    
}
