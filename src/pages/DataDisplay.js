import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, DataDetail, DataDescription, DataModal, DataInfo } from '../styles';
import { WiRaindrops, WiCloudy, WiStrongWind } from 'react-icons/wi';
import LineGraph from '../components/d3/LineGraph';
import { fetchWeather } from '../utils/FetchWeather';
import { sortWeatherData } from '../utils/SortWeatherData';
export default class DataDisplay extends PureComponent {
    state = {
        data: [
            { date: new Date("2019-11-06T19:00:00-08:00"), temp: 53 },
            { date: new Date("2019-11-06T20:00:00-08:00"), temp: 51 },
            { date: new Date("2019-11-06T21:00:00-08:00"), temp: 50 },
            { date: new Date("2019-11-06T22:00:00-08:00"), temp: 49 },
            { date: new Date("2019-11-06T23:00:00-08:00"), temp: 48 },
            { date: new Date("2019-11-07T00:00:00-08:00"), temp: 47 },
            { date: new Date("2019-11-07T01:00:00-08:00"), temp: 46 },
            { date: new Date("2019-11-07T02:00:00-08:00"), temp: 45 },
            { date: new Date("2019-11-07T03:00:00-08:00"), temp: 44 },
            { date: new Date("2019-11-07T03:00:00-08:00"), temp: 44 },
            { date: new Date("2019-11-07T05:00:00-08:00"), temp: 43 },
            { date: new Date("2019-11-07T06:00:00-08:00"), temp: 41 },
        ],
        dataResults: [],
        location: 'Portland',
        cityName: '',
        stateName: '',
    }

    // getLocationid = () => {
    //     return fetchLocationId(90265)
    //         .then(results => this.setState({ results: results[0], cityName: results[0].ParentCity.EnglishName, cityId: results[0].ParentCity.Key, stateName: results[0].AdministrativeArea.EnglishName }));
    // }

    getWeather = (zip) => {
        return fetchWeather(zip)
        .then(results => this.setState({ data: sortWeatherData(results.weatherData), cityName: results.cityData[0].EnglishName, stateName: results.cityData[0].AdministrativeArea.ID }));
    }

    componentDidMount() {
        this.getWeather(97212);
    }

    // componentDidUpdate() {
    //     console.log('city id', this.state.cityId);
    //     this.getWeather(this.state.cityId);
    // }
    

    render() {
        const { data, results, cityName, dataResults, stateName } = this.state;
        console.log('results', results);
        console.log('name', cityName);
        console.log('data results', dataResults);
        console.log('state name', stateName);
        console.log('results', dataResults)
        return(
            <>
                <Header />
                <DisplayTitle>
                    <h1>5-Day Temp for</h1>
                    <h1 className="location-title">{cityName}, {stateName}</h1>
                </DisplayTitle>
                <div>
                    <LineGraph data={data} />
                </div>
                <DataDetail>
                    <DataDescription>
                        <h2>Description</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </DataDescription>
                    <DataModal>
                        <h2>Weather Specifics</h2>
                        <DataInfo>
                            <WiRaindrops size="100" />
                            <p>Rain weather specifics rain rain rain rain.</p>
                        </DataInfo>
                        <DataInfo>
                            <WiStrongWind size="100" />
                            <p>Wind weather specifics rwind wind wind wind</p>
                        </DataInfo>
                        <DataInfo>
                            <WiCloudy size="100" />
                            <p>Clouds weather specifics couds ouds louds clouds.</p>
                        </DataInfo>
                    </DataModal>

                </DataDetail>
            </>
        )
    }
}
