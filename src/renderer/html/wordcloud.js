const d3 = require('d3');
const cloud = require('d3-cloud');
const lowercase = require('../../transform/lowercase');
const excludeStopwords = require('../../filter/exclude-stopwords');
const excludeNumbers = require('../../filter/exclude-numbers');
const minlength = require('../../filter/minlength');
const countWords = require('../../transform/count-words');
const byProperty = require('../../sorter/by-property');
const toArray = require('../../transform/to-array');
const toKeyValue = require('../../transform/to-key-value');

module.exports = (container, words) => {
    const countedWords = words
        .map(lowercase)
        .filter(excludeStopwords)
        .filter(excludeNumbers)
        .filter(minlength(3))
        .reduce(countWords('text', 'size'), {});

    const getFontSize = (layoutProps) => 16 + layoutProps.size / 2;

    const draw = (words) => d3.select(container).append('svg')
        .attr('width', layout.size()[0])
        .attr('height', layout.size()[1])
        .append('g')
        .attr('transform', 'translate(' + layout.size()[0] / 2 + ',' + layout.size()[1] / 2 + ')')
        .selectAll('text')
        .data(words)
        .enter().append('text')
        .style('font-size', (d) => {return d.size + 'px';})
        .style('font-family', 'sans-serif')
        .attr('text-anchor', 'middle')
        .attr('transform', (d) => {return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';})
        .text((d) => {return d.text;});

    const layout = cloud()
        .size([500, 500])
        .words(toArray(countedWords))
        .padding(5)
        .font('sans-serif')
        .fontSize(getFontSize)
        .on('end', draw);

    layout.start();
}
