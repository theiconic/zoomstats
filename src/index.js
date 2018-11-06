#!/usr/bin/env node

const program = require('commander');
const jsdom = require('jsdom');
const parser = require('./parser/html.js');
const analyzer = require('./analyzer/talktime.js');
const { JSDOM } = jsdom;

program
    .command('talktime <file>')
    .description('Analyze the given transscript HTML file for talktime per speaker')
    .action(file => {
        console.log('analyzing file %s', file);

        JSDOM.fromFile(file, {}).then(dom => {
            const data = parser.parse(dom);
            const times = analyzer.analyze(data);

            console.log(times);
        });
    });

program.parse(process.argv);
