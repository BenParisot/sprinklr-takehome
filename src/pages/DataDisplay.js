import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, CurrentTemp, DisplayHeader, DataInfo, GraphDiv, Dolores } from '../styles';
import { FiCloudDrizzle } from 'react-icons/fi';
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa';
import { fetchWeather } from 'src/utils/fetchWeather.js';
import { sortWeatherData } from '../utils/sortWeatherData';
import { setColorFromCurrentTemp } from '../utils/setColorFromCurrentTemp';
import makeLineGraph from '../utils/makeLineGraph';

export default class DataDisplay extends PureComponent {
    state = {
        zip: this.props.match.params.zip,
        data: null,
        cityName: '',
        stateName: '',
        rainProp: '',
        completedMount: false,
        tempAvg: '',
        tempLow: '',
        tempHigh: '',
        currentTemp: '',
        tempColor: '',
        highColor: '',
        lowColor: ''
    }

    getWeather = (zip) => {
        return fetchWeather(zip)
            .then(results => this.setState({
                data: sortWeatherData(results.weatherData),
                cityName: results.cityData[0].EnglishName,
                stateName: results.cityData[0].AdministrativeArea.ID,
                rainProp: results.weatherData[0].PrecipitationProbability,
                completedMount: true,
                tempAvg: Math.floor((((sortWeatherData(results.weatherData)).map(d => d.temp)).reduce((a, b) => a + b, 0) / 12)),
                tempHigh: Math.max(...(sortWeatherData(results.weatherData)).map(d => d.temp)),
                tempLow: Math.min(...(sortWeatherData(results.weatherData)).map(d => d.temp)),
                currentTemp: sortWeatherData(results.weatherData)[0].temp,
                tempColor: setColorFromCurrentTemp(sortWeatherData(results.weatherData)[0].temp),
                highColor: setColorFromCurrentTemp(Math.max(...(sortWeatherData(results.weatherData)).map(d => d.temp))),
                lowColor: setColorFromCurrentTemp(Math.min(...(sortWeatherData(results.weatherData)).map(d => d.temp)))
            }));
    }

    componentDidMount() {
        this.getWeather(this.state.zip);
    }

    componentDidUpdate() {
        makeLineGraph(this.state.data, this.state.tempColor);
    }

    render() {
        const { cityName, stateName, rainProp, data, tempHigh, tempLow, currentTemp, tempColor, highColor, lowColor } = this.state;

        return (
            <>
                <Header />
                {data ?
                    <>
                        <DisplayHeader>
                            <DisplayTitle tempColor={tempColor}>
                                <h1>12-HR Temps for <span className="location-title">{cityName}, {stateName}</span></h1>
                            </DisplayTitle>
                            <CurrentTemp tempColor={tempColor}>
                                <p>Current Temp:</p>
                                <h1>{currentTemp}&deg;</h1>
                            </CurrentTemp>
                        </DisplayHeader>
                        <GraphDiv>
                            <div id="svg">
                            </div>
                        </GraphDiv>
                        <DataInfo>
                            <FiCloudDrizzle size="80" color="#018bb1" />
                            <p>There is a {rainProp}% change it's gonna rain today.</p>
                        </DataInfo>
                        <DataInfo>
                            <FaArrowCircleUp size="80" color={highColor} />
                            <p>The high over the next 12 hours will be {tempHigh}&deg;</p>
                        </DataInfo>
                        <DataInfo>
                            <FaArrowCircleDown size="80" color={lowColor} />
                            <p>The low over the next 12 hours will be {tempLow}&deg;</p>
                        </DataInfo>
                    </> :
                    <Dolores>Your content is loading</Dolores>}
            </>
        )
    }
}
