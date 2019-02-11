const wordcloud = require('./wordcloud');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

test('calling wordcloud returns render function', () => {
    const dom = JSDOM.fragment('<div/>');
    const renderer = wordcloud(['abc', 'def', 'ghi']);
    expect(typeof (renderer)).toBe('function');});
