export const sortWeatherData = (data) => {
    const weatherTrunc = data.map(d => {
        return {
            date: new Date(d.DateTime),
            temp: d.Temperature.Value,
        }
    })
    return weatherTrunc;
}
