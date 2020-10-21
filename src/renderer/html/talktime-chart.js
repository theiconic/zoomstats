const d3 = require('d3');
const humanizeTalktime = require('../util/humanize-talktime');

const innerRadius = 100;
const radius = 250;

const arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius((d) => {
        return (radius - innerRadius) * (d.data.timeslice / 100) + innerRadius;
    });

const draw = (container, pie, summary) => {
    var svg = d3.select(container)
        .append('svg')
        .attr('width', 500)
        .attr('height', 500)
        .append('g')
        .attr('transform', 'translate(250,250)');

    const label = svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("fill", "#424242");

    label.append("tspan")
        .attr("class", "name")
        .attr('font-weight', 'bold')
        .attr('font-size', '1.5em')
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", "-0.5em")
        .text('total');

    label.append("tspan")
        .attr("class", "time")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", "1em")
        .text(summary.humanized);

    label.append("tspan")
        .attr("class", "turns")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", "2.5em")
        .text(summary.turns + ' turns');

    label.append("tspan")
        .attr("class", "time-per-turn")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", "4em")
        .text(((summary.total / 1000) / summary.turns).toPrecision(2) + ' s/turn');

    const fade = (opacity) => {
        return (d, i) => {
            svg.selectAll('path.segment')
                .filter(d => d.index != i)
                .transition()
                .style('opacity', opacity);
        };
    };

    const mousein = (d, i) => {
        fade(.2)(d, i);
        label.select('.name').text(d.data.name);
        label.select('.time').text(d.data.humanized);
        label.select('.turns').text(d.data.turns.length + ' turns');
        label.select('.time-per-turn').text(((d.data.total / 1000) / d.data.turns.length).toPrecision(2) + ' s/turn');
    }

    const mouseout = (d, i) => {
        fade(1)(d, i);
        label.select('.name').text('total');
        label.select('.time').text(summary.humanized);
        label.select('.turns').text(summary.turns + ' turns');
        label.select('.time-per-turn').text(((summary.total / 1000) / summary.turns).toPrecision(2) + ' s/turn');
    }

    const path = svg.selectAll(".solidArc")
        .data(pie)
        .enter().append("path")
        .attr("fill", (d) => d.data.color)
        .attr("class", "segment")
        .attr("stroke", "#ffffff")
        .attr("d", arc)
        .on('mouseover', mousein)
        .on('mouseout', mouseout);
};

module.exports = (data) => {
    const names = Object.keys(data);
    const maxtime = names.reduce(
        (maxtime, name) => Math.max(maxtime, (data[name].total / data[name].turns.length)),
        0
    );
    const summary = humanizeTalktime({
        total: names.reduce((total, name) => total + data[name].total, 0),
        turns: names.reduce((turns, name) => turns + data[name].turns.length, 0)
    });

    data = names.map((name) => {
        return {
            ...data[name],
            timeslice: (data[name].total / data[name].turns.length) / maxtime * 100
        }
    });

    const pie = d3.pie()
        .sort(null)
        .value((d) => d.turns.length)
        (data);

    return (container) => {
        draw(container, pie, summary);
    };
};
