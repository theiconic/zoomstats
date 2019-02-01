const Messenger = require('ext-messenger');
const messenger = new Messenger();
const talktime = require('../analyzer/talktime.js');
const effectiveness = require('../analyzer/effectiveness.js');
const words = require('../analyzer/words.js');
const wordcloud = require('../renderer/html/wordcloud.js');
const getObjectMapper = require('../util/object-map');

const connection = messenger.initConnection('main', () => {return true;});

const buildSpeakerName = (name) => {
    const speakerName = document.createElement('dt');
    speakerName.textContent = name;
    return speakerName;
}

const buildSpeakerTime = (time) => {
    const speakerTime = document.createElement('dd');
    speakerTime.textContent = time;
    return speakerTime;
}

const buildSpeaker = (name, time) => {
    const speaker = document.createElement('dl');
    speaker.classList.add('entry');

    speaker.appendChild(buildSpeakerName(name));
    speaker.appendChild(buildSpeakerTime(time));

    return speaker;
}

const renderPopup = (data) => {
    const statsDom = document.querySelector('.stats');
    const times = talktime(data);

    document.getElementById('title').textContent = data.topic;
    document.querySelector('.effectivenessValue').textContent = effectiveness(data);

    Object.keys(times).map((key) => {
        statsDom.appendChild(buildSpeaker(key, times[key]));
    });

    wordcloud(words(data))(document.querySelector('.wordcloud'));
}

window.onload = () => {
    setTimeout(function () {
        connection.sendMessage('content_script:main', {
            cmd: 'getTranscript'
        }).then(renderPopup);
    }, 500);
}
