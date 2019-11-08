import * as d3 from 'd3';

export default function makeLineGraph(data) {
    const svg = d3.select('svg');
    const height = 440;
    const width = 1100;
    const color = '#CB8589';

    const xValue = d => d.date;
    const xAxisLabel = 'Hours';

    const yValue = d => d.temp;
    const yAxisLabel = 'Temperature(F)';

    const margin = { top: 60, right: 40, bottom: 88, left: 105 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleTime()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, 110])
        .range([innerHeight, 0]);

    const g = svg.append('g')
        .attr('background-color', 'red')
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
        .attr('stroke', 'none')
        .attr('font-size', '24')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`)
        .attr('font-size', '16')
        .attr('stroke', 'none');

   

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 80)
        .attr('font-size', '24')
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel);

    const lineGenerator = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis);


        g.append('path')
        .attr('class', 'line-path')
        .attr('stroke-width', 0)
        .attr('stroke', '#FFB500')
        .attr('d', lineGenerator(data))
        .transition()
        .duration(1000)
        .attr('stroke', color)
        .attr('stroke-width', 10)
        .transition()
        .duration(2000)
        .attr('stroke', '#018BB1')
        .attr('stroke-width', 4);


    
}
