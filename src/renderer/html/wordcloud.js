const { scaleOrdinal, schemeDark2, select } = require('d3');
const cloud = require('d3-cloud');
const lowercase = require('../../transform/lowercase');
const excludeStopwords = require('../../filter/exclude-stopwords');
const excludeNumbers = require('../../filter/exclude-numbers');
const minlength = require('../../filter/minlength');
const countWords = require('../../transform/count-words');
const toArray = require('../../transform/to-array');

const getFontSize = (layoutProps) => 16 + layoutProps.size / 2;

const fill = scaleOrdinal(schemeDark2);

const draw = (container, layout) => (words) => select(container).append('svg')
    .attr('width', layout.size()[0])
    .attr('height', layout.size()[1])
    .append('g')
    .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
    .selectAll('text')
    .data(words)
    .enter().append('text')
    .style('font-size', (d) => d.size + 'px')
    .style('font-family', 'Impact')
    .style("fill", (t) => fill(t.text.toLowerCase()))
    .attr('text-anchor', 'middle')
    .attr('transform', (d) => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
    .text((d) => d.text);

module.exports = (words) => {
    const countedWords = words
        .map(lowercase)
        .filter(excludeStopwords)
        .filter(excludeNumbers)
        .filter(minlength(3))
        .reduce(countWords('text', 'size'), {});

    const layout = cloud()
        .size([500, 500])
        .words(toArray(countedWords))
        .padding(1)
        .font('Impact')
        .fontSize(getFontSize)
        .timeInterval(10);

    return (container) => {
        layout.on('end', draw(container, layout))
        layout.start();
    };
}
