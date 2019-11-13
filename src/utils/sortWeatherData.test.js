import { sortWeatherData } from './sortWeatherData';

describe('Testing sorting of weather data', () => {
    it('returns a truncated array of weather data', () => {
        const mockWeatherObj = [
            {
                DateTime: "2019-11-06T19:00:00-08:00",
                Temperature: { Value: 53 },
                IsDaylight: true,
                UVIndex: null,
                CloudCover: 35
            },
            {
                DateTime: "2019-11-06T20:00:00-08:00",
                Temperature: { Value: 51 },
                IsDaylight: true,
                UVIndex: null,
                CloudCover: 35
            },
            {
                DateTime: "2019-11-06T21:00:00-08:00",
                Temperature: { Value: 50 },
                IsDaylight: true,
                UVIndex: null,
                CloudCover: 35

            }
        ];

        const truncWeather = sortWeatherData(mockWeatherObj);

        expect(truncWeather).toEqual([
            { date: new Date("2019-11-06T19:00:00-08:00"), temp: 53 },
            { date: new Date("2019-11-06T20:00:00-08:00"), temp: 51 },
            { date: new Date("2019-11-06T21:00:00-08:00"), temp: 50 }
        ]);
    })
})
