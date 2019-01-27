#!/usr/bin/env node

const program = require('commander');
const jsdom = require('jsdom');
const parser = require('./parser/html.js');
const talktime = require('./analyzer/talktime.js');
const effectiveness = require('./analyzer/effectiveness.js');
const { JSDOM } = jsdom;

program
    .command('talktime <file>')
    .description('Analyze the given recording HTML file for talktime per speaker')
    .action(file => {
        console.log('analyzing file %s', file);

        JSDOM.fromFile(file, {}).then(dom => {
            const data = parser.parse(dom.window.document);
            const times = talktime.analyze(data);

            console.log(times);
        });
    });

program
    .command('effectiveness <file>')
    .description('Analyze the given recording HTML file for overall meeting effectiveness')
    .action(file => {
        console.log('analyzing file %s', file);

        JSDOM.fromFile(file, {}).then(dom => {
            const data = parser.parse(dom.window.document);

            console.log('Meeting effectiveness: ' + effectiveness.analyze(data) + '%');
        });
    });

program.parse(process.argv);
