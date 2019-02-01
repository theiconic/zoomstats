const Messenger = require('ext-messenger');
const messenger = new Messenger();
const talktime = require('../analyzer/talktime.js');
const effectiveness = require('../analyzer/effectiveness.js');
const words = require('../analyzer/words.js');
const wordcloud = require('../renderer/html/wordcloud.js');

const connection = messenger.initConnection('main', () => {return true;});

window.onload = () => {
    setTimeout(function () {
        connection.sendMessage('content_script:main', {
            cmd: 'getTranscript'
        }).then((data) => {
            const title = document.getElementById('title');
            const container = document.querySelector('.stats');
            const times = talktime(data);

            title.textContent = data.topic + ' (' + effectiveness(data) + '%)';

            Object.keys(times).map((key) => {
                let entry = document.createElement('dl');
                entry.classList.add('entry');
                let user = document.createElement('dt');
                user.textContent = key;
                let time = document.createElement('dd');
                time.textContent = times[key];
                entry.appendChild(user);
                entry.appendChild(time);
                container.appendChild(entry);
            });

            wordcloud(document.querySelector('.wordcloud'), words(data));
        });
    }, 500);
}
