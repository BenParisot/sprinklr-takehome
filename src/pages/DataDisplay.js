import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, DisplayHeader, DataInfo, GraphDiv, Hr, Dolores } from '../styles';
import { WiRaindrops } from 'react-icons/wi';
import { fetchWeather } from '../utils/fetchWeather';
import { sortWeatherData } from '../utils/sortWeatherData';
import makeLineGraph from '../utils/makeLineGraph';
export default class DataDisplay extends PureComponent {
    state = {
        zip: this.props.match.params.zip,
        data: null,
        cityName: '',
        stateName: '',
        rainProp: '',
        completedMount: false
    }

    getWeather = (zip) => {
        return fetchWeather(zip)
            .then(results => this.setState({
                data: sortWeatherData(results.weatherData),
                cityName: results.cityData[0].EnglishName,
                stateName: results.cityData[0].AdministrativeArea.ID,
                rainProp: results.weatherData[0].PrecipitationProbability,
                completedMount: true
            }));
    }

    componentDidMount() {
        this.getWeather(this.state.zip);
    }

    componentDidUpdate() {
        const data = this.state.data;
        makeLineGraph(data);
    }

    render() {
        const color = '#CB8589';
        const { cityName, stateName, rainProp, data } = this.state;

        return (
            <>
                <Header />
                {data ?
                    <>
                        <DisplayHeader>
                            <DisplayTitle>
                                <h2>12-HR Temps for</h2>
                                <h1 className="location-title">{cityName}, {stateName}</h1>
                            </DisplayTitle>
                            <DataInfo>
                                <WiRaindrops size="200" color={color} />
                                <p>There is a {rainProp}% change it's gonna rain today.</p>
                            </DataInfo>
                        </DisplayHeader>
                        <GraphDiv>
                            <div id="svg">
                            </div>
                        </GraphDiv>
                        <Hr />
                    </> :
                    <Dolores>Your content is loading</Dolores>}
            </>
        )
    }
}
