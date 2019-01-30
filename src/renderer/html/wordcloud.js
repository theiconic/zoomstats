const d3 = require('d3');
const cloud = require('d3-cloud');
const stopword = require('stopword');

exports.render = (container, words) => {
    const countWords = (countedWords, word) => {
        if (!countedWords[word]) {
            countedWords[word] = {
                text: word,
                size: 0,
                test: 'haha'
            }
        }

        countedWords[word].size++;

        return countedWords;
    }

    words = stopword.removeStopwords(words);

    const reStopWords = /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall|yeah|just|think|know|quite|thing|things|probably|nice|good|really|basically|um|okay|actually)$/;
    const reNumbers = /^\d+$/

    words = words.filter((word) => {
        return word.toLowerCase().replace(reStopWords, '').replace(reNumbers, '');
    });

    words = words.filter((word) => word.length > 2);

    const countedWords = words.reduce(countWords, {});

    const layout = cloud()
        .size([500, 500])
        .words(Object.keys(countedWords).map((word) => countedWords[word]))
        .padding(5)
        .font('sans-serif')
        .fontSize((d) => {return 16 + d.size / 2;})
        .on('end', draw);

    layout.start();

    function draw(words) {
        console.log(words);

        d3.select(container).append('svg')
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
    }
}
