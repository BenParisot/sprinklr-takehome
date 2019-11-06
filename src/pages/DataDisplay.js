import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, DataDetail, DataDescription, DataModal, DataInfo } from '../styles';
import { WiRaindrops, WiCloudy, WiStrongWind } from 'react-icons/wi';
import * as d3 from 'd3';

export default class DataDisplay extends PureComponent {
    state = {
        data: [
            { date: 8, temp: 41 },
            { date: 9, temp: 44 },
            { date: 10, temp: 48 },
            { date: 11, temp: 53 },
            { date: 12, temp: 57 },

        ]
    }

    
    componentDidMount() {
        let line = d3.selectAll('#line');
        const totalLength = line.node().getTotalLength();
        console.log('total length', totalLength);

        line 
            .attr('stroke-dasharray', totalLength)
            .attr('stroke-dashoffset', totalLength)
            .attr('stroke-width', 8)
            .attr('stroke', '#6788ad')
            .transition()
            .duration(2000)
            .attr('stroke-width', 0)
            .attr('stroke-dashoffset', 0);

        let area = d3.selectAll('#area');

        area
            .attr('transform', 'translate(0, 300)')
            .transition()
            .duration(2000)
            .attr('transform', 'translate(0,0)');
    }

    render() {
    console.log('state', this.state.data);

        const { data } = this.state;

        const minX = d3.min(data.map(entry => entry.date));
        const maxX = d3.max(data.map(entry => entry.date));
        const minY = d3.min(data.map(entry => entry.temp));
        const maxY = d3.max(data.map(entry => entry.temp));

        let x = d3 
            .scaleLinear()
            .domain([minX, maxX])
            .range([0, 400]);

        let y = d3 
            .scaleLinear()
            .domain([minY, maxY])
            .range([300, 300 / 3]);


        const line = d3
            .line()
            .x(function(entry) {
                console.log('entry', entry);
                return x(entry.date);
            })
            .y(function(entry) {
                return y(entry.temp);
            });

            console.log('line', line);

        const area = d3
            .area()
            .x(function(entry) {
                return x(entry.date);
            })
            .y0(function(entry) {
                return maxY;
            })
            .y1(function(entry) {
                return y(entry.temp);
            });


        return(
            <div className="data-display">
                <Header />
                <DisplayTitle>
                    <h1>5-Day Temp for</h1>
                    <h1 className="location-title">Portland, OR</h1>
                </DisplayTitle>
                <div>
                    <svg>
                        <path
                            id={'line'}
                            d={line(data)}
                            fill={"transparent"}
                            stroke={"transparent"}
                        />
                        <path
                            id={'area'}
                            d={area(data)}
                            fill={"#888"}
                            style={{ opacity: 0.75 }}
                        />  
                    </svg>
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
            </div>
        )
    }
}
