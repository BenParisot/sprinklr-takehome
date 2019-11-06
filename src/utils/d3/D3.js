import * as d3 from 'd3';

const xScale = d3.scaleLinear()
    .domain([0, 12])
    .range([0, 1100])

const yScale = d3.scaleLinear()
    .domain([20, 110])
    .range([0, 440]);


