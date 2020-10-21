const { schemeCategory10, scaleOrdinal, select, ribbon, arc, descending } = require('d3');
const d3Chord = require('./util/d3-chord');

const fill = scaleOrdinal(schemeCategory10);

const addGradients = (svg, chords, innerRadius) => {
    var grads = svg.append('defs').selectAll('linearGradient')
        .data(chords)
        .enter().append('linearGradient')
        //Create a unique gradient id per chord: e.g. 'chordGradient-0-4'
        .attr('id', function(d) {
            return 'chordGradient-' + d.source.index + '-' + d.target.index;
        })
        //Instead of the object bounding box, use the entire SVG for setting locations
        //in pixel locations instead of percentages (which is more typical)
        .attr('gradientUnits', 'userSpaceOnUse')
        //The full mathematical formula to find the x and y locations
        //of the speaker's source chord
        .attr('x1', function(d, i) {
            return innerRadius * Math.cos((d.source.endAngle - d.source.startAngle)/2 +
                d.source.startAngle - Math.PI/2);
        })
        .attr('y1', function(d, i) {
            return innerRadius * Math.sin((d.source.endAngle - d.source.startAngle)/2 +
                d.source.startAngle - Math.PI/2);
        })
        //Find the location of the target speaker's chord
        .attr('x2', function(d, i) {
            return innerRadius * Math.cos((d.target.endAngle - d.target.startAngle)/2 +
                d.target.startAngle - Math.PI/2);
        })
        .attr('y2', function(d, i) {
            return innerRadius * Math.sin((d.target.endAngle - d.target.startAngle)/2 +
                d.target.startAngle - Math.PI/2);
        });

    grads.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', (d) => fill(d.source.index));

    grads.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', (d) => fill(d.target.index));
};

const draw = (container, chords, names) => {
    const innerRadius = 200;
    var svg = select(container)
        .append('svg')
        .attr('width', 500)
        .attr('height', 500)
        .append('g')
        .attr('transform', 'translate(250,250)');

    const fade = (opacity) => {
        return (d, i) => {
            svg.selectAll('path.chord')
                .filter(d => d.source.index != i && d.target.index != i)
                .transition()
                .style('opacity', opacity);
        };
    };

    svg.datum(chords)
        .append('g')
        .selectAll('path')
        .data(function(d) { return d; })
        .enter()
        .append('path')
        .attr('class', 'chord')
        .attr('d', ribbon().radius(innerRadius))
        .style('fill', function(d){
            return 'url(#chordGradient-' + d.source.index + '-' + d.target.index + ')';
        })
        .style('stroke', 'white');

    addGradients(svg, chords, innerRadius);

    const group = svg.datum(chords)
        .append('g')
        .selectAll('g')
        .data(function(d) { return d.groups; })
        .enter()
        .append('g')
        .attr('class', 'group')
        .on('mouseover', fade(.1))
        .on('mouseout', fade(1));

    group.append('path')
        .style('fill', (d) => fill(d.index))
        .style('stroke', 'white')
        .attr('d', arc().innerRadius(innerRadius).outerRadius(innerRadius + 10))
        .each(function(d,i) {
            //Search pattern for everything between the start and the first capital L
            const firstArcSection = /(^.+?)L/;

            //Grab everything up to the first Line statement
            let newArc = firstArcSection.exec(select(this).attr('d'))[1];
            //Replace all the comma's so that IE can handle it
            newArc = newArc.replace(/,/g , ' ');

            svg.append('path')
                .attr('class', 'hidden')
                .attr('id', 'arc' + i)
                .attr('d', newArc)
                .style('fill', 'none');
        });

    group.append('text')
        .attr('class', 'titles')
        .each(function(d) {
            d.angle = (d.startAngle + d.endAngle) / 2;
        })
        .attr('dy', '-.35em')
        .append('textPath')
        .attr('xlink:href', (d, i) => '#arc' + i)
        .attr('startOffset', '50%')
        .style('text-anchor', 'middle')
        .text((d) => names[d.index]);
};

module.exports = (data) => {
    const names = Object.keys(data);
    const matrix = names.map((speaker) => {
        const audience = data[speaker];

        return names.map((speaker) => {
            return audience[speaker] || 0;
        });
    });

    const chords = d3Chord()
        .padAngle(0.1)
        .sortChords(descending)
        (matrix);

    return (container) => {
        draw(container, chords, names);
    };
};
