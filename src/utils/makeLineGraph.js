import * as d3 from 'd3';

export default function makeLineGraph(data, tempColor) {
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
    y.domain([0, (d3.max(data, d => d.temp) + 20)]);

    svg.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'grey')
        .attr('stroke-width', 0)
        .attr('d', graphLine)
        .transition()
        .duration('1500')
        .attr('stroke-width', 10)
        .attr('stroke', '#CB8589')
        .transition()
        .duration('2500')
        .attr('stroke-width', 4)
        .attr('stroke', tempColor);

    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .call(d3.axisLeft(y));

    const mouseG = svg.append('g')
        .attr('class', 'mouse-over-effects');

    mouseG.append('path')
        .attr('class', 'mouse-line')
        .style('stroke', '#CB8589')
        .style('stroke-width', '2px')
        .style('opacity', '0');

    const lines = (document.getElementsByClassName('line'));

    const mousePerLine = mouseG.selectAll('.mouse-per-line')
        .data([data])
        .enter()
        .append('g')
        .attr('class', 'mouse-per-line');

    mousePerLine.append('circle')
        .attr('r', 14)
        .style('stroke', '#CB8589')
        .style('fill', 'none')
        .style('stroke-width', '2px')
        .style('opacity', '0');

    mousePerLine.append('text')
        .attr('transform', 'translate(25, -15)')
        .style('font-family', 'sans-serif')
        .style('font-size', '1.6rem')
        .style('text-transform', 'uppercase');

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
                    let d = `M${mouse[0]}, ${height}`;
                    d += ` ${mouse[0]}, 0`
                    return d;
                });

            d3.selectAll('.mouse-per-line')
                .attr('transform', function (d, i) {

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
                        .text(y.invert(pos.y).toFixed(0));
                    return "translate(" + mouse[0] + "," + pos.y +")";
                });
        }); 
}
