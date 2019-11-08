import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, DisplayHeader, DataInfo, GraphDiv, Hr, Dolores } from '../styles';
import { WiRaindrops } from 'react-icons/wi';
// import makeLineGraph from '../components/d3/LineGraph';
import { fetchWeather } from '../utils/FetchWeather';
import { sortWeatherData } from '../utils/SortWeatherData';
// import makeLineGraph from '../components/d3/LineGraph';
import * as d3 from 'd3';
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
        cityName: 'Portland',
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
        // this.getWeather(this.state.zip);
        

        console.log(document.getElementById('svg'));
        // makeLineGraph(this.state.data);
        this.setState({ completedMount: true });
    }

    componentDidUpdate() {
        const data = this.state.data;
        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const height = 440;
        const width = 1100;

        const x = d3.scaleTime()
            .range([0, width]);

        const y = d3.scaleLinear()
            .range([height, 0]);

        const graphLine = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.temp));

        const svg = d3.select('#svg')
            .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // const parseTime = d3.timeParse('%d-%b-%y');

        // data.forEach(d => {
        //     d.date = parseTime(d.date);
        //     d.temp = +d.temp;
        // });

        x.domain(d3.extent(data, d => d.date));
        y.domain([0, d3.max(data, d => d.temp)]);

        svg.append('path')
            .data([data])
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('d', graphLine);

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .call(d3.axisLeft(y));



    }




    render() {
        const color = '#CB8589';
        const height = 440;
        const width = 1100;

        const { cityName, stateName, rainProp } = this.state;

        return (
            <>
                <Header />
                {cityName ?
                    <>
                        <DisplayHeader>
                            <DisplayTitle>
                                <h2>12-Hours of Temp for</h2>
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
                    <>
                        <Dolores>Doesn't look like anything to me.</Dolores>
                    </>}
            </>
        )
    }
}
