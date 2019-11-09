import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, CurrentTemp, DisplayHeader, DataInfo, GraphDiv, Dolores } from '../styles';
import { WiRaindrops } from 'react-icons/wi';
import { fetchWeather } from '../utils/fetchWeather';
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
        currentTemp: ''
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
                currentTemp: sortWeatherData(results.weatherData)[0].temp
            }));
    }

    componentDidMount() {
        this.getWeather(this.state.zip);
    }

    componentDidUpdate() {
        makeLineGraph(this.state.data);
    }

    render() {
        const color = '#CB8589';
        const { cityName, stateName, rainProp, data, tempAvg, tempHigh, tempLow, currentTemp } = this.state;
        console.log('temp av', tempAvg);
        console.log('temp hi', tempHigh);
        console.log('temp lo', tempLow);
        console.log('current', currentTemp);
        const tempColor = () => setColorFromCurrentTemp(currentTemp);

        return (
            <>
                <Header />
                {data ?
                    <>
                        <DisplayHeader>
                            <DisplayTitle>
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
                                <WiRaindrops size="200" color={color} />
                                <p>There is a {rainProp}% change it's gonna rain today.</p>
                            </DataInfo>
                    </> :
                    <Dolores>Your content is loading</Dolores>}
            </>
        )
    }
}
