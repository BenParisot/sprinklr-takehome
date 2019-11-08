import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, DataDetail, DataDescription, DataModal, DataInfo, GraphDiv } from '../styles';
import { WiRaindrops, WiCloudy, WiStrongWind } from 'react-icons/wi';
import makeLineGraph from '../components/d3/LineGraph';
// import { fetchWeather } from '../utils/FetchWeather';
// import { sortWeatherData } from '../utils/SortWeatherData';
export default class DataDisplay extends PureComponent {
    state = {
        zip: this.props.match.params.zip,
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
        cityName: '',
        stateName: '',
        rainProp: '',
        uvIndex: '',
        windSpeed: '',

    }

    

    // getWeather = (zip) => {
    //     return fetchWeather(zip)
    //     .then(results => this.setState({ data: sortWeatherData(results.weatherData), cityName: results.cityData[0].EnglishName, stateName: results.cityData[0].AdministrativeArea.ID }));
    // }

    componentDidMount() {
        // this.getWeather(this.state.zip);
        makeLineGraph(this.state.data);
    }
    

    render() {
        const color = '#CB8589';
        const height = 440;
        const width = 1100;

        const { cityName, stateName } = this.state;

        return(
            <>
                <Header />
                <DisplayTitle>
                    <h1>5-Day Temp for</h1>
                    <h1 className="location-title">{cityName}, {stateName}</h1>
                </DisplayTitle>
                <GraphDiv>
                    <div id="svg">
                        <svg width={width} height={height} fill="none" stroke={color}></svg>
                    </div>
                </GraphDiv>
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
