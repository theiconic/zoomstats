const Messenger = require('ext-messenger');
const messenger = new Messenger();
const analyzer = require('../analyzer/talktime.js');

const connection = messenger.initConnection('main', () => {return true;});

window.onload = () => {
    setTimeout(function () {
        connection.sendMessage('content_script:main', {
            cmd: 'getTranscript'
        }).then((response) => {
            const container = document.querySelector('.stats');
            const times = analyzer.analyze(response);

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
        });
    }, 500);
}
