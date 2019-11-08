import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, DisplayHeader, DataInfo, GraphDiv, Hr, Dolores } from '../styles';
import { WiRaindrops } from 'react-icons/wi';
import { fetchWeather } from '../utils/FetchWeather';
import { sortWeatherData } from '../utils/SortWeatherData';
import * as d3 from 'd3';
import { dummyData } from '../assets/dummy-data';
export default class DataDisplay extends PureComponent {
    state = {
        zip: this.props.match.params.zip,
        data: dummyData,
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
        this.setState({
            completedMount: true
        })
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

        const mouseG = svg.append('g')
            .attr('class', 'mouse-over-effects');

        mouseG.append('path')
            .attr('class', 'mouse-line')
            .style('stroke', 'black')
            .style('stroke-width', '3px')
            .style('opacity', '0');

        const lines = (document.getElementsByClassName('line'));

        const mousePerLine = mouseG.selectAll('.mouse-per-line')
            .data([data])
            .enter()
            .append('g')
            .attr('class', 'mouse-per-line');

        mousePerLine.append('circle')
            .attr('r', 7)
            .style('stroke', 'red')
            .style('fill', 'none')
            .style('stroke-width', '1px')
            .style('opacity', '0');

        mousePerLine.append('text')
            .attr('transform', 'translate(10, 3)');

        mouseG.append('svg:rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .on('mouseout', function () {
                d3.select('.mouse-line')
                    .style('opacity', '0');
                d3.selectAll('.mouse-per-line circle')
                    .style('opacity', '0');
                d3.selectAll('.mouse-per-line text')
                    .style('opacity', '0');
            })
            .on('mouseover', function () {
                d3.select('.mouse-line')
                    .style('opacity', '1');
                d3.selectAll('.mouse-per-line circle')
                    .style('opacity', '1');
                d3.selectAll('.mouse-per-line text')
                    .style('opacity', '1');
            })
            .on('mousemove', function () {
                const mouse = d3.mouse(this);
                d3.select('.mouse-line')
                    .attr('d', function () {
                        let d = `M ${mouse[0]}, height`;
                        d += ` ${mouse[0]}, 0`
                        return d;
                    });

                d3.selectAll('.mouse-per-line')
                    .attr('transform', function (d, i) {
                        console.log(width / mouse[0])
                        const xDate = x.invert(mouse[0]),
                        bisect = d3.bisector(d => d.date).right,
                        idx = bisect(d.values, xDate);

                        let beginning = 0;
                        let end = lines[i].getTotalLength();
                        let target = null;
                        let pos = null;

                        while (true) {
                            target = Math.floor((beginning + end) / 2);
                            pos = lines[i].getPointAtLength(target);
                            if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                                break;
                            }
                            if (pos.x > mouse[0]) end = target;
                            else if (pos.x < mouse[0]) beginning = target;
                            else break;
                        }

                        d3.select(this).select('text')
                            .text(y.invert(pos.y).toFixed(2));
                        return `translate ${mouse[0]}, ${pos.y}`;
                    })
            });

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
