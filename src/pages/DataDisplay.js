import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, DisplayHeader, DataInfo, GraphDiv, Hr, Dolores } from '../styles';
import { WiRaindrops } from 'react-icons/wi';
import { fetchWeather } from '../utils/FetchWeather';
import { sortWeatherData } from '../utils/SortWeatherData';
import * as d3 from 'd3';
// import { dummyData } from '../assets/dummy-data';
export default class DataDisplay extends PureComponent {
    state = {
        zip: this.props.match.params.zip,
        data: null,
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
        this.getWeather(this.state.zip);
        // this.setState({
        //     completedMount: true
        // })
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

        x.domain(d3.extent(data, d => d.date));
        y.domain([0, d3.max(data, d => d.temp)]);

        svg.append('path')
            .data([data])
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 0)
            .attr('d', graphLine)
            .transition()
            .duration('1500')
            .attr('stroke-width', 10)
            .attr('stroke', '#CB8589')
            .transition()
            .duration('2500')
            .attr('stroke-width', 4)
            .attr('stroke', '#018bb1');

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .call(d3.axisLeft(y));
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
                <Dolores>Your content is loading</Dolores> }
            </>
        )
    }
}
