#!/usr/bin/env node

const program = require('commander');
const talktime = require('./analyzer/talktime.js');
const effectiveness = require('./analyzer/effectiveness.js');
const words = require('./analyzer/words.js');
const topwords = require('./renderer/json/topwords.js');
const parseVttFile = require('./util/parse-vtt-file');
const collaboration = require('./analyzer/collaboration.js');
const print = require('./util/print-to-stdout');

program
    .command('talktime <file>')
    .description('Analyze the given recording HTML file for talktime per speaker')
    .action(file => {
        print('analyzing file %s', file);

        parseVttFile(file).then(data => {
            print(talktime(data));
        });
    });

program
    .command('effectiveness <file>')
    .description('Analyze the given recording HTML file for overall meeting effectiveness')
    .action(file => {
        print('analyzing file %s', file);

        parseVttFile(file).then(data => {
            print('Meeting effectiveness: ' + effectiveness(data) + '%');
        });
    });

program
    .command('topwords <file>')
    .description('Analyze the given recording HTML file for top words')
    .action(file => {
        print('analyzing file %s', file);

        parseVttFile(file).then(data => {
            print(topwords(words(data)));
        });
    });

program
    .command('collaboration <file>')
    .description('Analyze the given recording HTML file for collaboration')
    .action(file => {
        print('analyzing file %s', file);

        parseVttFile(file).then(data => {
            print(collaboration(data));
        });
    });

program.parse(process.argv);
