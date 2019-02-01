const parse = require('../parser/html.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

module.exports = (file) => JSDOM.fromFile(file, {}).then(dom => {
    return parse(dom.window.document);
});
