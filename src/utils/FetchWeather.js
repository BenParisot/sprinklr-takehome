export const fetchLocationId = (zip) => {
    return fetch('http://dataservice.accuweather.com/locations/v1/postalcodes/US/search?apikey=GkyViiHRqGoeGWJIsYJkl27SxwiH3DXH&q=97212')
        .then(res => ([res.ok, res.json()]))
        .then(([ok, json]) => {
            if (!ok) throw 'Sorry, we could not fetch the weather right now';
            return json;
        });
};
