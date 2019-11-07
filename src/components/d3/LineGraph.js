import React from 'react';
import * as d3 from 'd3';

export default function LineGraph({ data }) {
    const width = 900;
    const height = 440;

    const graph = d3.select('#graph');
    console.log('graph', graph);

    const xScale = d3.scaleLinear()
    .domain([0, 12])
    .range([0, width - 100])

    const yScale = d3.scaleLinear()
    .domain([20, 100])
    .range([0, height]); 
    
    const xAxis = d3.axisBottom(xScale);
    
    const yAxis = d3.axisLeft(yScale);
    

    graph.append('g')
        .attr("transform", "translate(50, 10)")
        .call(yAxis);

    const xAxisTranslate = height / 2 + 10;
    
    graph.append('g')
        .attr("transform", "translate(50, " + xAxisTranslate  +")")
        .call(xAxis);


    return(
        <>
        <svg id="graph" width="1100" height="440" />
        </>
    )
}
