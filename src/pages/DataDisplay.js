import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, DataDetail, DataDescription, DataModal, DataInfo } from '../styles';
import { WiRaindrops, WiCloudy, WiStrongWind } from 'react-icons/wi';
import * as d3 from 'd3';
// import LineGraph from '../components/d3/LineGraph';
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
        const svg = d3.select('svg');

        const color = '#CB8589';
        const height = 440;
        const width = 1100;
        const svgCount = document.getElementById('svg');
        console.log('svg count', svgCount);

        const xValue = d => d.date;
        const xAxisLabel = 'Hours';
    
        const yValue = d => d.temp;
        const yAxisLabel = 'Temperature(F)';
    
        const margin = { top: 60, right: 40, bottom: 88, left: 105 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
    
        const xScale = d3.scaleTime()
            .domain(d3.extent(this.state.data, xValue))
            .range([0, innerWidth]);
    
        const yScale = d3.scaleLinear()
            .domain([0, 110])
            .range([innerHeight, 0]);
    
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
    
        const xAxis = d3.axisBottom(xScale)
            .tickSize(-innerHeight)
            .tickPadding(15);
    
        const yAxis = d3.axisLeft(yScale)
            .tickSize(-innerWidth)
            .tickPadding(10);
    
        const yAxisG = g.append('g').call(yAxis);
        yAxisG.selectAll('.domain').remove();
    
        yAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('y', -60)
            .attr('x', -innerHeight / 2)
            .attr('fill', 'black')
            .attr('transform', `rotate(-90)`)
            .attr('text-anchor', 'middle')
            .text(yAxisLabel);
    
        const xAxisG = g.append('g').call(xAxis)
            .attr('transform', `translate(0,${innerHeight})`);
    
        xAxisG.select('.domain').remove();
    
        xAxisG.append('text')
            .attr('class', 'axis-label')
            .attr('y', 80)
            .attr('x', innerWidth / 2)
            .attr('fill', 'black')
            .text(xAxisLabel);
    
        const lineGenerator = d3.line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(yValue(d)))
            .curve(d3.curveBasis);
    
            g.append('path')
            .attr('class', 'line-path')
            .attr('stroke-width', 4)
            .attr('d', lineGenerator(this.state.data));
        
        g.append('text')
            .attr('class', 'title')
            .attr('y', -10);
    }
    

    render() {


        const color = '#CB8589';
        const height = 440;
        const width = 1100;
    
        // 

        const { data, cityName, stateName } = this.state;
        console.log('data', data);
        return(
            <>
                <Header />
                <DisplayTitle>
                    <h1>5-Day Temp for</h1>
                    <h1 className="location-title">{cityName}, {stateName}</h1>
                </DisplayTitle>
                <div id="svg">
                    <svg width={width} height={height} fill="none" stroke={color}></svg>
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
