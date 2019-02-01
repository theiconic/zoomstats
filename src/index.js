#!/usr/bin/env node

const program = require('commander');
const talktime = require('./analyzer/talktime.js');
const effectiveness = require('./analyzer/effectiveness.js');
const words = require('./analyzer/words.js');
const topwords = require('./renderer/json/topwords.js');
const parseHtmlFile = require('./util/parse-html-file');
const print = require('./util/print-to-stdout');

program
    .command('talktime <file>')
    .description('Analyze the given recording HTML file for talktime per speaker')
    .action(file => {
        print('analyzing file %s', file);

        parseHtmlFile(file).then(data => {
            print(talktime(data));
        });
    });

program
    .command('effectiveness <file>')
    .description('Analyze the given recording HTML file for overall meeting effectiveness')
    .action(file => {
        print('analyzing file %s', file);

        parseHtmlFile(file).then(data => {
            print('Meeting effectiveness: ' + effectiveness(data) + '%');
        });
    });

program
    .command('topwords <file>')
    .description('Analyze the given recording HTML file for top words')
    .action(file => {
        print('analyzing file %s', file);

        parseHtmlFile(file).then(data => {
            print(topwords(words(data)));
        });
    });

program.parse(process.argv);
