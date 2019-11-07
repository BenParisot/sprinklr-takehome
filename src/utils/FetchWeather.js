export const fetchLocationId = (location) => {
    return fetch('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH&q=Portland')
        .then(res => ([res.ok, res.json]))
        .then(([ok, json]) => {
            if (!ok) throw 'Sorry, we could not fetch the weather right now';
            return json;
        });
};
